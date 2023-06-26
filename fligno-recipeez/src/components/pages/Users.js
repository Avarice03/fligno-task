import React, { useContext, useEffect, useState } from "react";
import { UserDetailsContext } from "../providers/UserDetailsProvider";
import { getAllUsers } from "../services/RecipesService";
import { UserContext } from "../providers/User";
import UserCard from "../UserCard";
import spinner from "../images/loading.gif";

const Users = () => {
  const [users, setUsers] = useState();
  const [userDetails] = useContext(UserDetailsContext);
  const [isLoggedIn, setLoggedIn] = useContext(UserContext);
  const [searchUser, setSearchUser] = useState("");
  const [selected, setSelected] = useState({ firstName: "User", lastName: "" });
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);
        if (userDetails.isAdmin) {
          const data = await getAllUsers();
          setUsers(data);
        }
      } catch (error) {
        if (error.response.status === 401) {
          localStorage.removeItem("token-auth");
          setLoggedIn();
          window.location.reload(true);
        }
      }
      setLoading(false);
    };
    fetch();
    // eslint-disable-next-line
  }, [userDetails, isLoggedIn]);

  const handleSelect = (user) => {
    setSelected(user);
  };

  if (!users) {
    return null;
  }

  if (isLoading) {
    return (
      <img src={spinner} className="loading-image" alt="cooking cat gif" />
    );
  }

  const handleSearch = (e) => {
    setSearchUser(e.target.value);
  };

  return (
    <div className="users-container">
      <div className="chat-container">
        <div className="chat-users">
          <h3>Users</h3>
          <div className="search-btn">
            <form className="d-flex mt-2 mb-2" role="search">
              <input
                className="form-control"
                type="search"
                value={searchUser}
                placeholder="Search User"
                aria-label="Search"
                onChange={handleSearch}
              />
            </form>
          </div>
          <div className="chat-list">
            {users
              .filter((user) => {
                const fullName = `${user.firstName} ${user.lastName}`;
                return fullName
                  .toLowerCase()
                  .includes(searchUser.toLowerCase());
              })
              .map((user) => {
                return (
                  <UserCard
                    key={user._id}
                    name={`${user.firstName} ${user.lastName}`}
                    details={user}
                    selected={selected}
                    handleSelect={handleSelect}
                  />
                );
              })}
          </div>
        </div>
        <div className="chat-wrapper">
          {selected && (
            <div className="chat-header">
              <h3>{`${selected.firstName} ${selected.lastName}`}</h3>
            </div>
          )}

          <div className="chat-content">
            <p>Chat Content Here</p>
          </div>
          <div className="chat-input">
            <div className="row">
              <div className="col-md-12">
                <div className="input-group mb-2">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Type your message"
                    aria-label="Type your message"
                    aria-describedby="send-button"
                  />
                  <div className="input-group-append">
                    <button
                      className="btn btn-danger"
                      type="button"
                      id="send-button"
                    >
                      Send
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;
