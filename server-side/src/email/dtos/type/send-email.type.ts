export type SendEmailServerType = {
  name: string;
  email: string;
  phone: string;
  message: string;
  timestamp?: string;
};

export type SendEmailResponseServerType = {
  status: boolean;
  error?: string;
};
