export interface UserState {
  idInstance: string;
  apiTokenInstance: string;
}
export enum UserActionTypes {
  AUTH_SUCCESS = "AUTH_SUCCESS",
  AUTH_LOGOUT = "AUTH_LOGOUT",
}
interface FetchUsersSuccessAction extends UserState {
  type: UserActionTypes.AUTH_SUCCESS;
}
interface UsersLogoutAction extends UserState {
  type: UserActionTypes.AUTH_LOGOUT;
  token: string;
}
export type UserAction = UsersLogoutAction | FetchUsersSuccessAction;
