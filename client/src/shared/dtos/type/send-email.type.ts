export type SendEmailType = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

export type SendEmailResponseType = {
  status: boolean;
  error?: string;
};