import { createContext, useContext, useReducer } from "react";
const AuthContext = createContext();

const authReducerFunction = (state, action) => {
  switch (action.type) {
    case "SET_LOGGED_USER":
      localStorage.setItem("token", action.payload.encodedToken);
      return {
        ...state,
        user: action.payload.foundUser,
        isLoggedIn: true,
      };
    case "LOGOUT_USER":
      return {
        ...state,
        isLoggedIn: false,
      };
    case "UPDATE_USER":
      return {
        ...state,
        user: action.payload,
      };
    case "UPDATE_USER_BOOKMARK":
      return {
        ...state,
        user: {
          ...state.user,
          bookmarks: action.payload,
        },
      };
    case "UPDATE_USER_POSTS":
      return {
        ...state,
        userPosts: action.payload,
      };
    default:
      return state;
  }
};
const authInitialState = {
  user: {},
  isLoggedIn: false,
  userPosts: [],
};
const AuthContextProvider = ({ children }) => {
  const [authState, authDispatch] = useReducer(
    authReducerFunction,
    authInitialState
  );
  return (
    <AuthContext.Provider value={{ authState, authDispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuthContext = () => useContext(AuthContext);

export { AuthContextProvider, useAuthContext };
