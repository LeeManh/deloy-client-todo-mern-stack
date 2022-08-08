import { createContext, useEffect, useReducer } from "react";
import { authReducer } from "../reducers/authReducer";
import { apiUrl } from "./constant";
import setAuthTokenHeader from "../utils/setAuthTokenHeader";
import axios from "axios";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [authState, dispatch] = useReducer(authReducer, {
    authLoading: true,
    isAuthenticated: false,
    user: null,
  });

  // check user login ->
  const loadUser = async () => {
    if (localStorage.getItem("token")) {
      setAuthTokenHeader(localStorage.token);
    }

    try {
      //get current user
      const response = await axios.get(`${apiUrl}/auth`);
      if (response.data.success) {
        dispatch({
          type: "SET_AUTH",
          payload: { isAuthenticated: true, user: response.data.user },
        });
      }
    } catch (error) {
      localStorage.removeItem("token");
      setAuthTokenHeader(null);
      dispatch({
        type: "SET_AUTH",
        payload: { isAuthenticated: false, user: null },
      });
    }
  };

  //login
  const loginUser = async ({ username, password }) => {
    try {
      const response = await axios.post(`${apiUrl}/auth/login`, {
        username,
        password,
      });

      if (response.data.success) {
        localStorage.setItem("token", response.data.accessToken);
        await loadUser();
      }

      return response.data;
    } catch (error) {
      if (error?.response?.data) {
        return error.response.data;
      } else {
        return { success: false, message: error.message };
      }
    }
  };

  //register
  const registerUser = async ({ username, password }) => {
    try {
      const response = await axios.post(`${apiUrl}/auth/register`, {
        username,
        password,
      });

      if (response.data.success) {
        localStorage.setItem("token", response.data.accessToken);
        await loadUser();
      }

      return response.data;
    } catch (error) {
      if (error?.response?.data) {
        return error.response.data;
      } else {
        return { success: false, message: error.message };
      }
    }
  };

  //logout
  const logoutUser = () => {
    localStorage.removeItem("token");
    dispatch({
      type: "SET_AUTH",
      payload: { isAuthenticated: false, user: null },
    });
  };

  useEffect(() => {
    loadUser();
  }, []);

  // context data
  const authContextData = { loginUser, authState, registerUser, logoutUser };

  return (
    <AuthContext.Provider value={authContextData}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
