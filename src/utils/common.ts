export const formatDate = (date: string): string => {
  return new Date(date).toLocaleString();
};

export const formatError = (error: Error): string => {
  return error.message;
};

export const formatSuccess = (message: string): string => {
  return message;
};

export default formatDate;
