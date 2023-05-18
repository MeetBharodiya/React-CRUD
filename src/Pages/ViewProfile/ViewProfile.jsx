import React from "react";
import { useParams } from "react-router-dom";
import moment from "moment/moment";

const ViewProfile = (prop) => {

  const {id} = useParams();
  const users = JSON.parse(localStorage.getItem("userdata"));
  const user = users.find((e,index)=>
  // eslint-disable-next-line
  index+1==id);
  

  return (
    <div>
      <div className="card">
        <div className="card-body">
          <h1 className="card-title">Hello!! {user.firstname+" "+user.lastname}</h1>
          <h6 className="card-subtitle mb-2 text-muted">Welcome to our product</h6>
          <h6>Contact Number : {user.contactnum} </h6>
          <h6>Date of Birth : {moment(user.dob).format('MM/DD/YYYY')} </h6>
          <h6>Gender : {user.gender} </h6>
        </div>
      </div>
    </div>
  );
};

export default ViewProfile;
