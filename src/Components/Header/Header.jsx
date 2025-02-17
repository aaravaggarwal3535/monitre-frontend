import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux"
import { clearId } from "../../redux/credentials/idSlice";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const id = useSelector((state) => state.id.value);
  const [response, setResponse] = useState("");
  const dispatch = useDispatch();

  const userName = async () => {
    let data = await fetch("https://monitre-backend.onrender.com/user-name", { method: "POST", headers: { "Content-Type": "application/json", }, body: JSON.stringify({ id }) });
    let res = await data.text();
    setResponse(res);
  }

  useEffect(() => {
    if (id) {
      userName();
    }
  }, [id]);

  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(clearId());
    navigate("/");
  }

  return (
    <nav className="bg-white border-b border-gray-200 fixed w-full z-10">
      <div className="mx-auto px-4 sm:px-2 justify-center items-center">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <a href="/">
              <img className="h-20 w-auto" src="/logo.png" alt="Logo" />
            </a>
            {!id ? ("") : (
              <Link
                to="/dashboard"
                className="bg-[#04AD83] text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-green-700 mr-1"
              >
                Dashboard
              </Link>
            )}
          </div>

          <div className="flex items-center space-x-4">
            {!id ? (
              <>
                <a
                  href="/login"
                  className="text-gray-600 hover:text-[#04AD83] text-lg font-medium"
                >
                  Log In
                </a>
                <a
                  href="/signup"
                  className="bg-[#04AD83] text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-green-700"
                >
                  Sign Up
                </a>
              </>
            ) : (
              <>
                <Link
                  to="/personal-details"
                  className="bg-[#04AD83] text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-green-700"
                >
                  {response}
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-700"
                >
                  Log Out
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
