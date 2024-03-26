export interface signUpInterface {
  email: string;
  password: string;
  passwordConfirm: string;
  name: string;
  phoneNumber: string;
  zipCode: string;
  address: string;
  detailAddress: string;
}

export const signUpDefaultValues: signUpInterface = {
  email: '',
  password: '',
  passwordConfirm: '',
  name: '',
  phoneNumber: '',
  zipCode: '',
  address: '',
  detailAddress: '',
};
