export interface signUpInterface {
  email: string;
  password: string;
  passwordConfirm: string;
  name: string;
  phone: string;
  zipcode: string;
  address: string;
  addressDetail: string;
}

export const signUpDefaultValues: signUpInterface = {
  email: '',
  password: '',
  passwordConfirm: '',
  name: '',
  phone: '',
  zipcode: '',
  address: '',
  addressDetail: '',
};
