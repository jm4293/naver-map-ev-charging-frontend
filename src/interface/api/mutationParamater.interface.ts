import { Dispatch, SetStateAction } from 'react';

export interface mutationParamaterInterface {
  state?: any;
  setState?: Dispatch<SetStateAction<any>>;
}
