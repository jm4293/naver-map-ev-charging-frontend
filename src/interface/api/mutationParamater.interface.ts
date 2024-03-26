import { Dispatch, SetStateAction } from 'react';

export interface MutationParamaterInterface {
  state?: any;
  setState?: Dispatch<SetStateAction<any>>;
}
