import React from "react";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { addUser } from "../services/RecipesService";

function Signup() {
  const [userName, setUserName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, confirmPass] = useState("");
  const [userErrMessage, setUserErrMessage] = useState("");
  const [passErrMessage, setPassErrMessage] = useState([]);
  const [confirmErrMessage, setConfirmErrMessage] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [showSnackbar, setShowSnackbar] = useState(false);
  const pass = document.querySelectorAll(".pass");
  const togglePassword = document.querySelector("#togglePassword");
  const navigate = useNavigate();

  //Function for password validation
  const passwordValidation = () => {
    const validations = [
      {
        condition: password.length < 8,
        message: "*Your password must be at least 8 characters.",
      },
      {
        condition: !password.match(/[a-z]/),
        message: "*Your password should contain at least one lowercase letter.",
      },
      {
        condition: !password.match(/[A-Z]/),
        message: "*Your password should contain at least one uppercase letter.",
      },
      {
        condition: !password.match(/\d/),
        message: "*Your password should contain at least one digit.",
      },
      {
        //eslint-disable-next-line
        condition: !password.match(/[!@#$%^&*()_+\-=\]\[{};':"\\|,.<>\/?]/),
        message:
          "*Your password should contain at least one special character.",
      },
    ];

    let errorArray = [];
    validations.map((validation) => {
      if (validation.condition) {
        errorArray.push(validation.message);
      }
      return validation;
    });

    if (errorArray.length) {
      setPassErrMessage([...errorArray]);
      return false;
    } else {
      return true;
    }
  };

  const handleSnackbarTrigger = () => {
    setShowSnackbar(true);
    setTimeout(function () {
      setShowSnackbar(false);
      setUserName("");
      setFirstName("");
      setLastName("");
      setPassword("");
      confirmPass("");
      setConfirmErrMessage("");
      navigate("/login");
    }, 3000);
  };

  // Function for signing in
  const handleSignup = async () => {
    try {
      if (userName) {
        setUserErrMessage("");
        if (passwordValidation()) {
          setPassErrMessage([]);
          const firstNameCopy =
            firstName.charAt(0).toUpperCase() + firstName.slice(1);
          const lastNameCopy =
            lastName.charAt(0).toUpperCase() + lastName.slice(1);
          setFirstName(firstNameCopy);
          setLastName(lastNameCopy);
          if (confirm === password) {
            const user = {
              firstName: firstName,
              lastName: lastName,
              userName: userName.toLowerCase(),
              password: password,
            };
            const response = await addUser(user);
            setResponseMessage(response.data.message);
            handleSnackbarTrigger();
          } else {
            setConfirmErrMessage("Your password did not match.");
          }
        }
      } else {
        setUserErrMessage("This field is required.");
      }
    } catch (error) {
      setResponseMessage(error.response.data.message);
    }
  };

  //Function for hiding and showing password
  const showPassword = () => {
    togglePassword.classList.toggle("bi-eye");
    pass.forEach((pass) => {
      if (pass.type === "password") {
        pass.type = "text";
      } else {
        pass.type = "password";
      }
    });
  };

  return (
    <div className="signin-container">
      <h2>Sign up to RecipeEZ</h2>
      <div className="login-container">
        <div className="form-container">
          <form onSubmit={(e) => e.preventDefault()}>
            <p>Username:</p>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              style={{ width: "100%", marginBottom: "0.5em" }}
              required
            />
            <small style={{ color: "red", marginBottom: "0.5em" }}>
              {userErrMessage}
            </small>
            <p>First Name:</p>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              style={{ width: "100%", marginBottom: "0.5em" }}
              required
            />
            <p>Last Name:</p>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              style={{ width: "100%", marginBottom: "0.5em" }}
              required
            />
            <p>Password:</p>
            <input
              type="password"
              className="pass"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ width: "100%", marginBottom: "0.5em" }}
              required
            />
            <i
              className="bi bi-eye-slash"
              id="togglePassword"
              style={{ marginLeft: "-30px", cursor: "pointer" }}
              onClick={showPassword}
            ></i>
            {passErrMessage.map((error) => (
              <p
                key={error}
                style={{
                  color: "red",
                  marginBottom: "0.5em",
                  fontSize: "small",
                }}
              >
                {error}
              </p>
            ))}
            <p>Confirm Password:</p>
            <input
              type="password"
              className="pass"
              value={confirm}
              onChange={(e) => confirmPass(e.target.value)}
              style={{ width: "100%", marginBottom: "0.5em" }}
              required
            />
            <p>
              <small style={{ color: "red", marginBottom: "0.5em" }}>
                {confirmErrMessage}
              </small>
            </p>
            <center>
              <p>
                <strong
                  style={{
                    color: "red",
                    marginBottom: "0.5em",
                  }}
                >
                  {responseMessage}
                </strong>
              </p>
            </center>
            <button
              type="submit"
              className="btn btn-danger"
              onClick={handleSignup}
              style={{ marginBottom: "0.5em", width: "100%" }}
              required
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
      <div className="create-container">
        <span>Already have an account?</span>
        <div>
          <NavLink to="/login">Sign in </NavLink>
          <span>➡️</span>
        </div>
      </div>
      {showSnackbar && (
        <div id="snackbar" className="show">
          {`Welcome ${firstName} ${lastName}! You have successfully registered to
        RecipeEZ.`}
        </div>
      )}
    </div>
  );
}

export default Signup;
