import { IAuthAction, ITodoItem } from "../interfaces";

export const signIn = (token: string): IAuthAction => ({
  type: "SIGN_IN",
  payload: {token}
});

export const signOut = (): IAuthAction => ({
  type: "SIGN_OUT",
});
