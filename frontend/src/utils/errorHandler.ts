export interface BackendError {
  success: boolean;
  message: string;
  error?: string;
}

interface ErrorWithResponse {
  response?: {
    data?: BackendError;
    statusText?: string;
  };
  message?: string;
}

export const extractErrorMessage = (error: unknown): string => {
  const errorObj = error as ErrorWithResponse;

  if (errorObj?.response?.data?.message) {
    return errorObj.response.data.message;
  }

  if (errorObj?.response?.data?.error) {
    return errorObj.response.data.error;
  }

  if (errorObj?.response?.statusText) {
    return errorObj.response.statusText;
  }

  if (errorObj?.message) {
    return errorObj.message;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "Error desconocido";
};
