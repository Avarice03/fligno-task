import { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import chef from "../images/chef.png";
import { UserContext } from "../providers/User";
import { getUserDetails, loginUser } from "../services/RecipesService";
import axios from "axios";
import { UserDetailsContext } from "../providers/UserDetailsProvider";

// Login page for RecipeEZ
function Login() {
  const [, setUserDetails] = useContext(UserDetailsContext);
  const [, setLoggedIn] = useContext(UserContext);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const pass = document.querySelectorAll(".pass");
  const togglePassword = document.querySelector("#togglePassword");
  const navigate = useNavigate();

  // Function for signing in
  const handleSignIn = async () => {
    try {
      const user = {
        userName: userName,
        passwordInput: password,
      };
      const response = await loginUser(user);
      localStorage.setItem("token-auth", response.data.token);
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${response.data.token}`;
      setLoggedIn(localStorage.getItem("token-auth"));
      const data = await getUserDetails();
      setUserDetails(data);
      navigate("/recipes");
    } catch (error) {
      if (error.response.status === 401) {
        localStorage.removeItem("token-auth");
        setResponseMessage(error.response.data.message);
      }
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
      <img src={chef} alt="chef avatar"></img>
      <h2>Sign in to RecipeEZ</h2>
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
            <p>Password:</p>
            <input
              type="password"
              value={password}
              className="pass"
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
            <small style={{ color: "red", marginBottom: "0.5em" }}>
              {responseMessage}
            </small>
            <button
              type="submit"
              className="btn btn-danger"
              onClick={handleSignIn}
              style={{ marginBottom: "0.5em", width: "100%" }}
            >
              Sign in
            </button>
          </form>
        </div>
      </div>
      <div className="create-container">
        <span>New to RecipeEZ?</span>
        <NavLink to="/signup">Create an account.</NavLink>
      </div>
    </div>
  );
}

export default Login;
