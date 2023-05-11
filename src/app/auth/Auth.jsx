import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/auth/authSlice";
import jwtAuthService from "../services/jwtAuthService";
import localStorageService from "../services/localStorageService";
import firebaseAuthService from "../services/firebase/firebaseAuthService";

const Auth = ({ children }) => {
  const dispatch = useDispatch();
  const checkJwtAuth = () => {
    jwtAuthService.loginWithToken().then((user) => {
      dispatch(setUserData(user));
    });
  };

  const checkFirebaseAuth = () => {
    firebaseAuthService.checkAuthStatus((user) => {
      if (user) {
        console.log(user.uid);
        console.log(user.email);
        console.log(user.emailVerified);
      } else {
        console.log("not logged in");
      }
    });
  };

  useEffect(() => {
    dispatch(setUserData(localStorageService.getItem("auth_user")));
    checkJwtAuth();
    // checkFirebaseAuth();
  }, []);

  return <>{children}</>;
};

export default Auth;
