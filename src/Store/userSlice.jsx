import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  firstname: "",
  lastname: "",
  contactnum: null,
  dob: "",
  gender: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const user = {
        firstname: action.payload.firstname,
        lastname: action.payload.lastname,
        contactnum: action.payload.contactnum,
        dob: action.payload.dob,
        gender: action.payload.gender,
      };
      let data = JSON.parse(localStorage.getItem("userdata")) ?? [];
      localStorage.setItem("userdata", JSON.stringify([...data, user]));
    },
    updateUser: (state, action) => {
      const user = {
        firstname: action.payload.firstname,
        lastname: action.payload.lastname,
        contactnum: action.payload.contactnum,
        dob: action.payload.dob,
        gender: action.payload.gender,
      };
      let data = JSON.parse(localStorage.getItem("userdata"));
      data = data.map((item, i) => {
        // eslint-disable-next-line
        if (i+1 == action.payload.index) {
          return user;
        } else {
          return item;
        }
      });
      localStorage.setItem("userdata",JSON.stringify(data));
    },
  },
});

export const { setUser, updateUser } = userSlice.actions;
export default userSlice.reducer;
