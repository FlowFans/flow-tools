export interface UserInfo {
    loggedIn: boolean;
}

export interface SubmitFunc {
    (values: any, actions: any): void;
  }