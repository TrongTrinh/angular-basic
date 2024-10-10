export interface IUserDetail {
  id?: number;
  firstName: string;
  lastName: string;
  username: string;
}

export const emptyUser: IUserDetail = {
  firstName: '',
  lastName: '',
  username: '',
};
