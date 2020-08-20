import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const login = createAsyncThunk(
  "user/add/requestStatus",
  async (data, thunkAPI) => {
    const url = "http://localhost:5000/user/login";
    axios({
      method: "post",
      url: url,
      data: data,
    })
      .then((res) => {
        console.log(res);
        if (res.data.user === 0) {
          thunkAPI.dispatch(
            addUserIdUsername({
              userId: res.data.userId,
              username: res.data.username,
            })
          );
        } else {
          thunkAPI.dispatch(failedLogin());
        }
      })
      .catch((err) => {
        console.dir(err);
        thunkAPI.dispatch(failedLogin());
      });
  }
);

// redux toolkit slice of store with initial state & reducers included
export const loginSlice = createSlice({
  name: "login",
  initialState: {
    userId: "",
    username: "",
    failedLogin: false,
  },
  reducers: {
    addUserIdUsername: (state, action) => {
      const { userId, username } = action.payload;
      state.userId = userId;
      state.username = username;
      
    },
    failedLogin: (state) => {
      state.failedLogin = true;
    },
  },
});

export const { addUserIdUsername, failedLogin } = loginSlice.actions; // export reducers to be called in comps

// export the current store state
export const selectLogin = (state) => state.login;

export default loginSlice.reducer; // export the slice to the store
