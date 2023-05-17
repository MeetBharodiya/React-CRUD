import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setUser, updateUser } from "../../Store/userSlice";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Form = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const user =
    location.state && location.state.user ? location.state.user : undefined;
  const index =
    location.state && location.state.index ? location.state.index : undefined;

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    contactnum: null,
    dob: "",
    gender: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        firstname: user.firstname,
        lastname: user.lastname,
        contactnum: user.contactnum,
        dob: user.dob,
        gender: user.gender,
      });
    }
  }, [user]);

  useEffect(() => {
    return () => {
      setFormData({
        firstname: "",
        lastname: "",
        contactnum: null,
        dob: "",
        gender: "",
      });
    };
  }, []);
  const onchange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(
      setUser({
        firstname: formData.firstname,
        lastname: formData.lastname,
        contactnum: formData.contactnum,
        dob: formData.dob,
        gender: formData.gender,
      })
    );
    navigate("/dashboard");
  };

  const handleupdate = (e) => {
    e.preventDefault();
    dispatch(
      updateUser({
        firstname: formData.firstname,
        lastname: formData.lastname,
        contactnum: formData.contactnum,
        dob: formData.dob,
        gender: formData.gender,
        index: index,
      })
    );
    navigate("/dashboard");
  };

  return (
    <>
      {user && index && <h1>Edit Profile</h1>}
      <div></div>
      <div className="container">
        <form>
          <div className="mb-3 form-outline w-50 container">
            <label for="exampleInputEmail1" className="form-label mx-auto">
              First Name
            </label>
            <input
              type="text"
              className="form-control"
              name="firstname"
              id="firstname"
              value={formData.firstname}
              onChange={onchange}
              aria-describedby="emailHelp"
              placeholder="Enter your fisrtame"
            />
          </div>
          <div className="mb-3 form-outline w-50 container">
            <label for="exampleInputEmail1" className="form-label mx-auto">
              Last Name
            </label>
            <input
              type="text"
              className="form-control"
              id="lastname"
              name="lastname"
              value={formData.lastname}
              onChange={onchange}
              aria-describedby="emailHelp"
              placeholder="Enter your lastname"
            />
          </div>
          <div className="mb-3 form-outline w-50 container">
            <label for="exampleInputEmail1" className="form-label mx-auto">
              Contact Number
            </label>
            <input
              type="tel"
              size={10}
              pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
              className="form-control"
              id="contactnum"
              value={formData.contactnum}
              name="contactnum"
              onChange={onchange}
              aria-describedby="emailHelp"
              placeholder="Enter your contact number"
              required
            />
          </div>
          <div className="mb-3 form-outline w-50 container">
            <label for="exampleInputEmail1" className="form-label mx-auto">
              DOB
            </label>
            <br />
            <input
              type="date"
              id="dob"
              name="dob"
              value={formData.dob}
              onChange={onchange}
            />
          </div>
          <div className="mb-3 form-outline w-50 container">
            <label for="exampleInputEmail1" className="form-label mx-auto">
              Gender
            </label>
            <select
              className="form-select"
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={onchange}
              required
            >
              <option hidden>Select your gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          {index ? (
            <button
              type="submit"
              className="btn btn-primary"
              onClick={(e) => handleupdate(e)}
            >
              Update
            </button>
          ) : (
            <button
              type="submit"
              className="btn btn-primary"
              onClick={(e) => handleClick(e)}
            >
              Submit
            </button>
          )}
        </form>
      </div>
    </>
  );
};

export default Form;
