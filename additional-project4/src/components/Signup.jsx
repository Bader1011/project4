import React from "react";
const Signup = ({ renderInput, handleSubmit }) => {
  return (
    <div className="form">
          <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        {renderInput("name", "Name")}
        {renderInput("email", "Email")}
        {renderInput("password", "Password", "password")}
        {renderInput("phone", "Phone")}
        {/* {renderInput("is_volunteer", "Volunteer","checkbox", true )} */}
        <button className="btnsub"> SignUp </button>
      </form>
    </div>
  );
};

export default Signup;