export interface IFormData {
  name: string;
  company: string;
  mobile_phone: string;
  email_address: string;
  postcode: string;
  pay_options: string[];
}

export interface IFormPostData extends Omit<IFormData, "pay_options"> {
  pay_now: boolean;
  pay_later: boolean;
}

export interface IDealership extends IFormPostData {
  id: string;
}
