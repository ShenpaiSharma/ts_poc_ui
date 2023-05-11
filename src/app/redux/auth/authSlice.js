import history from "@history.js";
import { createSlice } from "@reduxjs/toolkit";
import jwtAuthService from "../../services/jwtAuthService";
import localStorageService from "../../services/localStorageService";
import FirebaseAuthService from "../../services/firebase/firebaseAuthService";

const initialState = {
  isAuthenticated: true,
  accessToken: undefined,
  success: false,
  loading: false,
  error: {
    username: null,
    password: null,
  },
  errorMessage: null,
  user: {},
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserData: (state, action) => {
      const user = action.payload;
      state = { ...state, ...user };
    },

    userLoggedIn: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.user = action.payload.user;
    },

    userLoggedOut: (state) => {
      state.accessToken = undefined;
      state.user = undefined;
    },

    resetPassword: (state, action) => {
      state.success = true;
      state.loading = false;
      console.log(action.payload.email);
    },

    requestStart: (state, action) => {
      state.loading = true;
    },

    loginWithEmailAndPassword: (state, action) => {
      const { email, password } = action.payload;
      // state.loading = true;

      jwtAuthService
        .loginWithEmailAndPassword(email, password)
        .then((user) => {
          // state.user = user;
          // state.accessToken = user.token;
          // state.success = true;
          // state.loading = false;
          // state = {
          //   ...state,
          //   user: user,
          //   accessToken: user.token,
          //   success: true,
          //   loading: false,
          // };

          // history.push({ pathname: "/" });

          // localStorageService.setItem("auth_user", {
          //   accessToken: user.token,
          //   user: user,
          // });
          console.log("success");
        })
        .catch((error) => {
          console.log("Error occurd");
          // state.success = false;
          // state.loading = false;
          // state.error = error.data;
        });

      console.log(state.loading);
    },

    firebaseLoginEmailPassword: (state, action) => {
      const { email, password } = action.payload;
      state.loading = true;

      FirebaseAuthService.signInWithEmailAndPassword(email, password)
        .then((user) => {
          if (user) {
            state.user = {
              ...user,
              userId: "1",
              role: "ADMIN",
              displayName: "Watson Joyce",
              email: "watsonjoyce@gmail.com",
              photoURL: "/assets/images/face-7.jpg",
              age: 25,
              token: "faslkhfh423oiu4h4kj432rkj23h432u49ufjaklj423h4jkhkjh",
            };

            history.push({ pathname: "/" });

            state.success = true;
            state.loading = false;
          } else {
            state.success = false;
            state.loading = false;
          }
        })
        .catch((error) => {
          state.success = false;
          state.loading = false;
          state.error = error.data;
        });
    },
    logoutJWTUser: (state) => {
      console.log(state.user);
      // jwtAuthService.logout();

      // history.push({ pathname: "/session/signin" });

      // state.user = undefined;
    },
  },
});

export const {
  setUserData,
  userLoggedIn,
  userLoggedOut,
  resetPassword,
  logoutJWTUser,
  loginWithEmailAndPassword,
  firebaseLoginEmailPassword,
} = authSlice.actions;
export default authSlice.reducer;
