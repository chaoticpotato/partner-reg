import { IFormData } from "./types";

export const prepareData = (data: IFormData) => {
  const formData = new FormData();

  const { name, company, mobile_phone, email_address, pay_options, postcode } =
    data;

  // inserting values directly
  formData.append("name", name);
  formData.append("company", company);
  formData.append("mobile_phone", mobile_phone);
  formData.append("email_address", email_address);
  formData.append("postcode", postcode);

  // picking values for fit the example POST data
  formData.append("pay_now", pay_options.includes("pay_now").toString());
  formData.append("pay_later", pay_options.includes("pay_later").toString());

  return formData;
};
