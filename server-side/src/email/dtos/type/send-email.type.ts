export type SendEmailServerType = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

export type SendEmailResponseServerType = {
  status: boolean;
  error?: string;
};
