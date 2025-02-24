import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const Verify = () => {
  const [statusMessage, setStatusMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const verifyEmail = async () => {
      const token = searchParams.get("token");
      const email = searchParams.get("email");

      if (!token || !email) {
        setStatusMessage("Invalid verification link.");
        setIsSuccess(false);
        return;
      }

      try {
        const response = await axios.get(
          `http://localhost:5000/api/users/verify`,
          {
            params: { token, email }, // Send token and email as query parameters
          }
        );
        setStatusMessage(response.data.message);
        setIsSuccess(true);
      } catch (error) {
        setStatusMessage(
          error.response?.data?.message || "Verification failed. Try again."
        );
        setIsSuccess(false);
      }
    };

    verifyEmail();
  }, [searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md text-center">
        <h1
          className={`text-2xl font-semibold ${
            isSuccess ? "text-green-600" : "text-red-600"
          }`}
        >
          {isSuccess ? "Success!" : "Error"}
        </h1>
        <p className="mt-4 text-gray-600">{statusMessage}</p>
        {isSuccess && (
          <a
            href="/login/userlogin"
            className="mt-6 inline-block bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
          >
            Go to Login
          </a>
        )}
      </div>
    </div>
  );
};

export default Verify;
