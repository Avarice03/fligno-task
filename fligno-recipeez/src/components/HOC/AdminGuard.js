import axios from "axios";
import { useContext } from "react";
import { UserDetailsContext } from "../providers/UserDetailsProvider";

function AdminGuard({ children }) {
  const [userDetails] = useContext(UserDetailsContext);
  const token = localStorage.getItem("token-auth");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  if (!userDetails) {
    return null;
  }
  return (
    <>
      {userDetails.isAdmin ? children : <h1>Error 401: User not Authorized</h1>}
    </>
  );
}

export default AdminGuard;
