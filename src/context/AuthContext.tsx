import { useReducer, createContext } from "react";
import {
  IAuthAction,
  IAuthContextState,
  IAuthContextModel,
  IAuthSignInAction,
  IAuthSignOutAction,
} from "../interfaces";
import { AUTH_ACTIONS } from "../constants";
import { is } from "typescript-is";

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
      if (is<IAuthSignOutAction>(action))
        return {
          ...state,
          isAuth: false,
          token: "",
        };
      break;

    case AUTH_ACTIONS.SIGN_IN:
      if (is<IAuthSignInAction>(action))
        return {
          ...state,
          isAuth: true,
          token: action.payload.token,
        };
      break;

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
