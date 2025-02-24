import axios from "axios";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../component/Footer";
import Navbar from "../component/Navbar";

const Predictor = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    age: null,
    gender: null,
    hypertension: null,
    heart_disease: null,
    avg_glucose_level: [],
    bmi: "",
    marital_status: "",
    work_type: "",
    residence_type: "",
    smoking_status: "",
  });

  const [userStatus, setUserStatus] = useState({
    doctorReviewCompleted: false,
    bmiCalculated: false,
    heartAssessmentCompleted: false,
  });

  const [recommendation, setRecommendation] = useState("");
  const [glucoseLoaded, setGlucoseLoaded] = useState(false);
  const [isGlucoseLoading, setIsGlucoseLoading] = useState(true);

  useEffect(() => {
    setIsGlucoseLoading(true);
    fetch("http://localhost:5000/api/users/healthdata", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const glucoseLevel =
          data.glucoseRecords && data.glucoseRecords.length > 0
            ? data.glucoseRecords.length === 1
              ? data.glucoseRecords[0].glucose
              : data.glucoseRecords.reduce(
                  (acc, record) => acc + record.glucose,
                  0
                ) / data.glucoseRecords.length
            : 0;

        console.log(glucoseLevel.toFixed(1));
        setFormData((prevData) => ({
          ...prevData,
          avg_glucose_level: glucoseLevel.toFixed(1),
        }));
        setIsGlucoseLoading(false);
        if (data) {
          if (
            data.doctorReviewCompleted &&
            data.bmiCalculated &&
            data.heartAssessmentCompleted
          ) {
            setUserStatus({
              doctorReviewCompleted: true,
              bmiCalculated: true,
              heartAssessmentCompleted: true,
            });
            setFormData({
              ...formData,
              age: data.age || null,
              gender: data.gender || null,
              hypertension: data.hypertension || null,
              heart_disease: data.heartDisease || null,
              bmi: data.bmi || "",
              avg_glucose_level: glucoseLevel,
            });
          } else if (
            data.bmiCalculated &&
            !data.heartAssessmentCompleted &&
            !data.doctorReviewCompleted
          ) {
            setUserStatus({
              doctorReviewCompleted: false,
              bmiCalculated: true,
              heartAssessmentCompleted: false,
            });
          } else if (
            data.bmiCalculated &&
            data.heartAssessmentCompleted &&
            !data.doctorReviewCompleted
          ) {
            setUserStatus({
              doctorReviewCompleted: false,
              bmiCalculated: true,
              heartAssessmentCompleted: true,
            });
          } else {
            setUserStatus({
              doctorReviewCompleted: false,
              bmiCalculated: false,
              heartAssessmentCompleted: false,
            });
          }
        } else {
          setUserStatus({
            doctorReviewCompleted: false,
            bmiCalculated: false,
            heartAssessmentCompleted: false,
          });
        }
      })
      .catch((error) => {
        console.error("Error fetching health data:", error);
        setIsGlucoseLoading(false);
        setUserStatus({
          doctorReviewCompleted: false,
          bmiCalculated: false,
          heartAssessmentCompleted: false,
        });
      });
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const generateRecommendation = (prediction, formData) => {
    if (prediction > 50) {
      if (formData.age > 60) {
        return "Consider focusing on diet improvements and low-impact activities. Regular medical check-ups are also advised.";
      } else {
        return "Incorporate cardiovascular exercises, manage stress, and consider lifestyle changes to reduce stroke risk.";
      }
    }

    // Advice for moderate prediction values
    if (prediction > 20) {
      if (formData.age < 40) {
        return "Maintain a balanced diet, exercise regularly, and avoid smoking to stay healthy.";
      } else {
        return "Keep up with routine checkups, engage in moderate exercise, and manage blood pressure.";
      }
    }

    // Advice for lower risk prediction values
    if (prediction > 10) {
      if (formData.age < 40) {
        return "Your risk is low. Continue with a balanced diet, stay active with regular exercise, and avoid smoking or excessive alcohol. Keep an eye on stress levels and prioritize sleep for overall wellness.";
      } else {
        return "Your risk is low. Maintain a healthy diet, engage in light to moderate physical activities, manage stress, and ensure regular health checkups to keep things in check. Continue monitoring your blood pressure and glucose levels.";
      }
    }

    // Advice for very low prediction values
    if (prediction <= 10) {
      if (formData.age < 10) {
        return "Your risk is very low! Encourage a balanced diet with plenty of fruits and vegetables, regular playtime or light exercise, and good sleep habits. Limit sugary snacks and drinks, and encourage activities that promote overall well-being.";
      } else if (formData.age < 40) {
        return "Your risk is very low! Continue with a balanced diet, stay active with regular exercise, and avoid smoking or excessive alcohol. Keep an eye on stress levels and prioritize sleep for overall wellness.";
      } else {
        return "Your risk is very low! Maintain a healthy lifestyle with regular check-ups, healthy eating, and staying active with moderate physical activities.";
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Decode the token to extract userId
    const token = localStorage.getItem("token");
    const decodedToken = JSON.parse(atob(token.split(".")[1])); // Decoding the JWT token
    const userId = decodedToken.userid; // Assuming userId is in the payload of the token
    console.log(decodedToken);
    console.log(userId);
    const predictionData = {
      age: [formData.age || 0],
      hypertension: [formData.hypertension ? 1 : 0],
      heart_disease: [formData.heart_disease ? 1 : 0],
      avg_glucose_level: [formData.avg_glucose_level || 0],
      bmi: [formData.bmi || 0],
      gender_Male: [formData.gender === "male" ? 1 : 0],
      ever_married_Yes: [formData.marital_status === "married" ? 1 : 0],
      work_type_Private: [formData.work_type === "private" ? 1 : 0],
      work_type_Self_employed: [formData.work_type === "self-employed" ? 1 : 0],
      work_type_children: [formData.work_type === "children" ? 1 : 0],
      work_type_Govt_job: [formData.work_type === "govt" ? 1 : 0],
      Residence_type_Urban: [formData.residence_type === "urban" ? 1 : 0],
      smoking_status_formerly_smoked: [
        formData.smoking_status === "formerly_smoked" ? 1 : 0,
      ],
      smoking_status_never_smoked: [
        formData.smoking_status === "never_smoked" ? 1 : 0,
      ],
      smoking_status_smokes: [formData.smoking_status === "smokes" ? 1 : 0],
    };

    axios
      .post("http://localhost:5001/predict", predictionData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        let prediction = response.data.stroke_prediction;
        if (prediction < 0) {
          prediction = 0;
        }
        toast.success(`Prediction Result: ${prediction.toFixed(2)}%`);
        setRecommendation(generateRecommendation(prediction, formData));

        // After receiving prediction, save it with userId to the backend
        const predictionToSave = {
          userId: userId, // Send userId along with prediction
          predictionResult: prediction.toFixed(2),
          createdAt: new Date(),
        };

        console.log(predictionToSave);

        // Save the prediction with the userId in the backend
        axios
          .post("http://localhost:5000/api/save-prediction", predictionToSave, {
            headers: {
              "Content-Type": "application/json",
            },
          })
          .then((data) => {
            console.log("Prediction saved:", data);
            setFormData((prevData) => ({
              ...prevData,
              marital_status: "",
              work_type: "",
              residence_type: "",
              smoking_status: "",
            }));
          })
          .catch((error) => {
            console.error("Error saving prediction:", error);
          });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 flex items-center justify-center p-6">
        <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-lg">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h2 className="text-4xl font-extrabold text-indigo-800 mb-6">
              Health Predictor
            </h2>
            {!userStatus.bmiCalculated && (
              <Link className="text-indigo-500 mb-4" to={"/bmi"}>
                Please calculate your BMI first. Click here &rarr;
              </Link>
            )}
            {userStatus.bmiCalculated &&
              formData.avg_glucose_level === "0.0" &&
              !userStatus.doctorReviewCompleted && (
                <Link className="text-indigo-500 mb-4" to={"/glucose"}>
                  Please fill in your glucose level first. Click here &rarr;
                </Link>
              )}
            {userStatus.bmiCalculated &&
              !userStatus.heartAssessmentCompleted &&
              formData.avg_glucose_level !== "0.0" && (
                <Link className="text-indigo-500 mb-4" to={"/userassessment"}>
                  Complete the heart assessment first. Click here &rarr;
                </Link>
              )}

            {userStatus.bmiCalculated &&
              userStatus.heartAssessmentCompleted &&
              formData.avg_glucose_level !== "0.0" &&
              !userStatus.doctorReviewCompleted && (
                <p className="text-red-500 mb-4">
                  Waiting for doctor review approval.
                </p>
              )}
            {userStatus.bmiCalculated &&
              userStatus.heartAssessmentCompleted &&
              userStatus.doctorReviewCompleted &&
              formData.avg_glucose_level !== 0 && (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Marital Status */}
                  <div>
                    <label
                      htmlFor="marital_status"
                      className="block text-lg font-semibold text-indigo-800 mb-2"
                    >
                      Marital Status
                    </label>
                    <select
                      id="marital_status"
                      name="marital_status"
                      value={formData.marital_status}
                      onChange={handleChange}
                      className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                      required
                    >
                      <option value="">Select Marital Status</option>
                      <option value="married">Married</option>
                      <option value="single">Single</option>
                      <option value="divorced">Divorced</option>
                    </select>
                  </div>

                  {/* Work Type */}
                  <div>
                    <label
                      htmlFor="work_type"
                      className="block text-lg font-semibold text-indigo-800 mb-2"
                    >
                      Work Type
                    </label>
                    <select
                      id="work_type"
                      name="work_type"
                      value={formData.work_type}
                      onChange={handleChange}
                      className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                      required
                    >
                      <option value="">Select Work Type</option>
                      <option value="private">Private</option>
                      <option value="self-employed">Self-employed</option>
                      <option value="govt">Government Job</option>
                      <option value="children">Children</option>
                      <option value="never_worked">Never Worked</option>
                    </select>
                  </div>

                  {/* Residence Type */}
                  <div>
                    <label
                      htmlFor="residence_type"
                      className="block text-lg font-semibold text-indigo-800 mb-2"
                    >
                      Residence Type
                    </label>
                    <select
                      id="residence_type"
                      name="residence_type"
                      value={formData.residence_type}
                      onChange={handleChange}
                      className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                      required
                    >
                      <option value="">Select Residence Type</option>
                      <option value="urban">Urban</option>
                      <option value="rural">Rural</option>
                    </select>
                  </div>

                  {/* Smoking Status */}
                  <div>
                    <label
                      htmlFor="smoking_status"
                      className="block text-lg font-semibold text-indigo-800 mb-2"
                    >
                      Smoking Status
                    </label>
                    <select
                      id="smoking_status"
                      name="smoking_status"
                      value={formData.smoking_status}
                      onChange={handleChange}
                      className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                      required
                    >
                      <option value="">Select Smoking Status</option>
                      <option value="never_smoked">Never Smoked</option>
                      <option value="smokes">Smokes</option>
                      <option value="formerly_smoked">Formerly Smoked</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="block w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
                  >
                    Calculate Risk
                  </button>
                </form>
              )}
            {recommendation && (
              <div className="mt-6 bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 rounded">
                <p className="font-semibold">
                  Recommendation: {recommendation}
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Predictor;
