import { useEffect, useState } from "react";
import { getAuth, isSignInWithEmailLink, signInWithEmailLink } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const ConfirmEmail = () => {
  const [message, setMessage] = useState("Verifying...");
  const navigate = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    if (isSignInWithEmailLink(auth, window.location.href)) {
      let email = window.localStorage.getItem("emailForSignIn");
      if (!email) {
        email = window.prompt("Please provide your email for confirmation");
      }

      signInWithEmailLink(auth, email, window.location.href)
        .then(() => {
          window.localStorage.removeItem("emailForSignIn");
          setMessage("Sign-in successful! Redirecting...");
          setTimeout(() => navigate("/dashboard"), 2000);
        })
        .catch((error) => {
          console.error("Error signing in with email link:", error);
          setMessage("Error verifying the link. Please try again.");
        });
    } else {
      setMessage("Invalid or expired sign-in link.");
    }
  }, [auth, navigate]);

  return (
    <div className="h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h2 className="text-xl font-semibold">{message}</h2>
      </div>
    </div>
  );
};

export default ConfirmEmail;
