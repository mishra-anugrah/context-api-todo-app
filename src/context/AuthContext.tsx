import { useReducer, createContext } from "react";
import {
  IAuthAction,
  IAuthContextState,
  IAuthContextModel,
} from "../interfaces";
import { AUTH_ACTIONS } from "../constants";

const defaultState: IAuthContextState = {
  isAuth: false,
  token: "",
};

const reducer = (
  state: IAuthContextState,
  action: IAuthAction
): IAuthContextState => {
  switch (action.type) {
    case AUTH_ACTIONS.SIGN_OUT:
      return {
        ...state,
        isAuth: false,
        token: "",
      };

    case AUTH_ACTIONS.SIGN_IN:
      return {
        ...state,
        isAuth: true,
        token: action.payload.token,
      };

    default:
      return state;
  }
};

export const AuthContext = createContext({} as IAuthContextModel);

export const AuthProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(reducer, defaultState);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
