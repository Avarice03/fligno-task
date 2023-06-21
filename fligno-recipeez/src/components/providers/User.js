import { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

// Provider for admin user status
export const UserProvider = (props) => {
  const [isLoggedIn, setLoggedIn] = useState();
  const tokenExists = localStorage.getItem("token-auth");

  useEffect(() => {
    setLoggedIn(tokenExists);
  }, [tokenExists]);

  return (
    <UserContext.Provider value={[isLoggedIn, setLoggedIn]}>
      {props.children}
    </UserContext.Provider>
  );
};

const userExport = { UserContext, UserProvider };

export default userExport;
