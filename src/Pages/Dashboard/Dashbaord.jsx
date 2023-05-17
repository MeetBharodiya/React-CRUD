import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import moment from "moment";
import Form from "../Form/Form";

const Dashbaord = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [ind, setInd] = useState(null);
  const [isClick, setClick] = useState(false);
  const [filter, setFilter] = useState("");
  const [requestedUSerToUpdate, setRequestedUSerToUpdate] = useState([]);
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    contactnum: null,
    dob: "",
    gender: "",
  });
  const ref = useRef(null);
  const refClose = useRef(null);
  useEffect(() => {
    const storedData = localStorage.getItem("userdata");
    if (storedData) {
      setData(JSON.parse(storedData));
    }
  }, []);
  const handledelete = (i) => {
    const updatedData = data.filter((e, index) => index !== i);
    setData(updatedData);
    localStorage.setItem("userdata", JSON.stringify(updatedData));
  };

  const onchange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleClick = (e) => {
    e.preventDefault();
    let data = JSON.parse(localStorage.getItem("userdata"));
    data = data.map((user, i) => {
      if (i == ind) {
        return formData;
      } else {
        return user;
      }
    });
    setData(data);
    refClose.current.click();
  };

  const handleupdate = (item, index) => {
    setClick(!isClick);
    setRequestedUSerToUpdate(item);
    setInd(index);
  };
  const [valueLength, setValueLength] = useState(0);

  useEffect(() => {
    const value = localStorage.getItem('filter');
    console.log('value😎', value)
    setValueLength(value ? value.length : 0);
  }, []);

  return (
    <>
      {isClick
        ? navigate("/", { state: { user: requestedUSerToUpdate, index: ind } })
        : null}
      <div className="mt-3">
        <h2>Registered User's List:</h2>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Index</th>
              <th scope="col">Full Name</th>
              <th scope="col">Date of Birth</th>
              <th scope="col">Contact Number</th>
              <th scope="col">Gender</th>
              <th scope="col">View</th>
              <th scope="col">Update</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
            {data
              ? (filter
                  ? data.filter(
                      (item) =>
                        item.firstname.includes(filter) ||
                        item.lastname.includes(filter)
                    )
                  : data
                ).map((item, index) => (
                  <tr>
                    <th scope="row">{index + 1}</th>
                    <td>{item.firstname + " " + item.lastname}</td>
                    <td>{moment(item.dob).format("MM/DD/YYYY")}</td>
                    <td>{item.contactnum}</td>
                    <td>{item.gender}</td>
                    <td>
                      <Link to={`/view/${index + 1}`}>
                        <i className="fa-sharp fa-solid fa-eye"></i>
                      </Link>
                    </td>
                    <td>
                      <i
                        type="submit"
                        className="fa-solid fa-pen-to-square"
                        onClick={() => handleupdate(item, index + 1)}
                      ></i>
                    </td>
                    <td>
                      <i
                        type="submit"
                        className="fa-sharp fa-solid fa-trash"
                        onClick={() => handledelete(index)}
                      ></i>
                    </td>
                  </tr>
                ))
              : null}
          </tbody>
        </table>
      </div>
      <button
        type="button"
        ref={ref}
        class="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>

      <div
        class="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Edit User
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <form>
                <div className="mb-3 form-outline w-50 container">
                  <label
                    for="exampleInputEmail1"
                    className="form-label mx-auto"
                  >
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
                  <label
                    for="exampleInputEmail1"
                    className="form-label mx-auto"
                  >
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
                  <label
                    for="exampleInputEmail1"
                    className="form-label mx-auto"
                  >
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
                  <label
                    for="exampleInputEmail1"
                    className="form-label mx-auto"
                  >
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
                  <label
                    for="exampleInputEmail1"
                    className="form-label mx-auto"
                  >
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
              </form>
            </div>
            <div class="modal-footer">
              <button
                ref={refClose}
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                onClick={(e) => handleClick(e)}
                type="button"
                class="btn btn-primary"
              >
                Update User
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashbaord;
