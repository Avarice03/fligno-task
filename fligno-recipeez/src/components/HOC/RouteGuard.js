import axios from "axios";

function RouteGuard({ children }) {
  const token = localStorage.getItem("token-auth");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  return <>{token ? children : <h1>Error 401: User not Authorized</h1>}</>;
}

export default RouteGuard;
