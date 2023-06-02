import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { signOut } from "../actions/AuthActions";

export const Header = (props: any) => {
  const { state, dispatch } = useContext(AuthContext);

  const { isAuth } = state;

  const handleAuthButtonClick = () => {
    if (isAuth) dispatch(signOut());
  };

  return isAuth ? (
    <button onClick={handleAuthButtonClick}>Logout</button>
  ) : (
    <></>
  );
};
