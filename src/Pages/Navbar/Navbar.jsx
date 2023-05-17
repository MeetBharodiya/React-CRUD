import React,{useEffect, useState} from "react";
import {Link} from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setFilter } from "../../Store/filterSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [filter,setFilter] = useState([])


  const handlechange = (event) =>{
    localStorage.setItem("filter",event.target.value)
    setFilter(event.target.value)

  }

  useEffect(() => {
    localStorage.removeItem("filter")
  },[])

  const handleClick = (e) =>{
    e.preventDefault()
   dispatch(setFilter(filter));
  }

  return (
    <div>
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container-fluid">
          <Link to="/" class="navbar-brand" href="#">
            Task
          </Link>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <Link to="/" class="nav-link active" aria-current="page">
                  Home
                </Link>
              </li>
              <li class="nav-item">
                <Link to="/dashboard" class="nav-link active" aria-current="page">
                  Dashboard
                </Link>
              </li>
            </ul>
            <form class="d-flex">
              <input
                class="form-control me-2"
                type="search"
                value={filter}
                onChange={handlechange}
                placeholder="Search"
                aria-label="Search"
              />
              <button class="btn btn-outline-success" type="submit" onClick={handleClick}>
                Search
              </button>
            </form>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
