import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../component/Footer";
import Navbar from "../component/Navbar";

const HeartHypertensionAssessment = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    chestPain: "",
    shortnessOfBreath: "",
    dizziness: "",
    familyHistory: "",
    smokingStatus: "",
    highBloodPressureHistory: "",
    heartDiseaseSymptoms: "",
  });
  const [message, setMessage] = useState("");
  const [userDetails, setUserDetails] = useState(null);
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = JSON.parse(atob(token.split(".")[1]));
        setUserDetails({
          userId: decodedToken.userid,
          name: decodedToken.name,
          gender: decodedToken.gender,
          age: decodedToken.age,
        });
      } catch (error) {
        console.error("Error decoding token", error);
      }
    }

    axios
      .get("http://localhost:5000/api/admin/get-doctors")
      .then((response) => setDoctors(response.data))
      .catch((error) => console.error("Error fetching doctors", error));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "mmoli04q");

    try {
      setUploading(true);
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dldist5ds/image/upload",
        formData
      );
      setImage(response.data.secure_url);
    } catch (error) {
      console.error("Image upload failed", error);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userDetails) {
      setMessage("User details are not available.");
      return;
    }

    if (!image) {
      setMessage("Please upload an image before submitting.");
      return;
    }

    if (!selectedDoctor) {
      setMessage("Please select a doctor before submitting.");
      return;
    }

    const dataToSend = {
      ...formData,
      userId: userDetails.userId,
      name: userDetails.name,
      gender: userDetails.gender,
      age: userDetails.age,
      image,
      doctorId: selectedDoctor._id,
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/api/heart-hypertension-assessment",
        dataToSend
      );
      setMessage(response.data.message);
      setFormData({
        chestPain: "",
        shortnessOfBreath: "",
        dizziness: "",
        familyHistory: "",
        smokingStatus: "",
        highBloodPressureHistory: "",
        heartDiseaseSymptoms: "",
      });
      setImage(null);
      setSelectedDoctor(null);
      navigate("/predictor");
    } catch (error) {
      console.error("Error submitting the form:", error);
      setMessage("Error submitting the form. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 font-sans">
      <Navbar />

      <section className="text-grey py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-extrabold text-indigo-800 text-center mb-4">
            Heart Disease & Hypertension Assessment
          </h1>
          <p className="text-xl text-center max-w-3xl mx-auto">
            Take our comprehensive assessment to evaluate your risk factors and
            receive personalized recommendations.
          </p>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {!selectedDoctor ? (
          <section>
            <h2 className="text-3xl font-semibold mb-8 text-center">
              Select a Doctor
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {doctors.map((doctor) => (
                <div
                  key={doctor._id}
                  className="bg-white rounded-lg shadow-lg hover:shadow-xl transition duration-300 ease-in-out cursor-pointer overflow-hidden"
                  onClick={() => setSelectedDoctor(doctor)}
                >
                  {doctor.image ? (
                    <img
                      src={doctor.image}
                      alt={doctor.username}
                      className="w-full h-48 object-cover"
                    />
                  ) : (
                    <div className="bg-gradient-to-r from-blue-500 to-blue-600 h-48 flex items-center justify-center">
                      <svg
                        className="w-24 h-24 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                    </div>
                  )}
                  <div className="p-4">
                    <h3 className="text-xl font-semibold text-gray-800 mb-1">
                      {doctor.username}
                    </h3>
                    <p className="text-blue-600 font-medium mb-2">
                      {doctor.specialization}
                    </p>
                    <p className="text-gray-600 mb-2">
                      <span className="font-semibold">Email:</span>{" "}
                      {doctor.email}
                    </p>
                    <p className="text-gray-600 mb-2">
                      <span className="font-semibold">Phone:</span>{" "}
                      {doctor.phoneNumber}
                    </p>
                    <p className="text-gray-600 mb-2">
                      <span className="font-semibold">Experience:</span>{" "}
                      {doctor.yearsOfExperience} years
                    </p>
                    <p className="text-gray-600">
                      <span className="font-semibold">Age:</span> {doctor.age}{" "}
                      years
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ) : (
          <section className="bg-white shadow-lg rounded-lg p-8">
            <h2 className="text-2xl font-semibold mb-6 text-center">
              Fill out the Medical History
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              {Object.entries(formData).map(([key, value]) => (
                <div key={key} className="mb-4">
                  <label
                    htmlFor={key}
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    {key
                      .split(/(?=[A-Z])/)
                      .join(" ")
                      .replace(/^\w/, (c) => c.toUpperCase())}
                    ?
                  </label>
                  <div className="relative">
                    <select
                      id={key}
                      name={key}
                      value={value}
                      onChange={handleChange}
                      className="block appearance-none w-full bg-gray-50 border border-gray-300 text-gray-700 py-3 px-4 pr-8 rounded-lg leading-tight focus:outline-none focus:bg-white focus:border-blue-500 transition duration-300 ease-in-out"
                      required
                    >
                      <option value="">Select</option>
                      <option value="no">No</option>
                      <option value="yes">Yes</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <svg
                        className="fill-current h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                      </svg>
                    </div>
                  </div>
                </div>
              ))}

              <div className="mb-4">
                <label
                  htmlFor="image"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Upload an Image
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
                  <div className="space-y-1 text-center">
                    <svg
                      className="mx-auto h-12 w-12 text-gray-400"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                      aria-hidden="true"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div className="flex text-sm text-gray-600">
                      <label
                        htmlFor="image"
                        className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                      >
                        <span>Upload a file</span>
                        <input
                          id="image"
                          name="image"
                          type="file"
                          className="sr-only"
                          onChange={handleImageUpload}
                          accept="image/*"
                          required
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                </div>
                {uploading && (
                  <p className="text-sm text-gray-500 mt-2">Uploading...</p>
                )}
                {image && (
                  <img
                    src={image}
                    alt="Uploaded"
                    className="mt-4 w-full max-w-md mx-auto rounded-lg shadow-md"
                  />
                )}
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-300 ease-in-out"
                >
                  Submit Assessment
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 ml-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </form>
            {message && (
              <div className="mt-6 p-4 bg-blue-100 border-l-4 border-blue-500 text-blue-700">
                <p>{message}</p>
              </div>
            )}
          </section>
        )}
      </main>
      <div className="pb-40"></div>
      <Footer />
    </div>
  );
};

export default HeartHypertensionAssessment;
