import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const Profile = () => {
  const { user, isAuthenticated } = useAuth0();

  return (
    <>
      {isAuthenticated && (
        <div className="flex">
          <img src={user.picture} alt="Profile" className="rounded-full w-10" />
          <h1 className="text-base font-semibold content-center ml-2">
            {user.name}
          </h1>
        </div>
      )}
    </>
  );
};

export default Profile;
