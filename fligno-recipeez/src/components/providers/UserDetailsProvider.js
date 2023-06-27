import { createContext, useState, useEffect, useContext } from "react";
import { getUserDetails } from "../services/RecipesService";
import { UserContext } from "./User";
import axios from "axios";

export const UserDetailsContext = createContext();

// Provider for admin user status
export const UserDetailsProvider = (props) => {
  const [userDetails, setUserDetails] = useState();
  const [isLoggedIn, setLoggedIn] = useContext(UserContext);
  const tokenExists = localStorage.getItem("token-auth");

  useEffect(() => {
    const fetch = async () => {
      try {
        if (isLoggedIn) {
          if (!userDetails && tokenExists) {
            axios.defaults.headers.common[
              "Authorization"
            ] = `Bearer ${tokenExists}`;
            const data = await getUserDetails();
            setUserDetails(data);
          }
        }
      } catch (error) {
        if (error.response.status === 401) {
          localStorage.removeItem("token-auth");
          setLoggedIn();
          window.location.reload(true);
          alert(`Session expired`);
        }
      }
    };
    fetch();
    // eslint-disable-next-line
  }, [isLoggedIn, userDetails, tokenExists]);

  return (
    <UserDetailsContext.Provider value={[userDetails, setUserDetails]}>
      {props.children}
    </UserDetailsContext.Provider>
  );
};

const userDetailsExport = { UserDetailsContext, UserDetailsProvider };

export default userDetailsExport;
