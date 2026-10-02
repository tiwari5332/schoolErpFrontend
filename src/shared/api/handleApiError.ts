import { AxiosError } from 'axios';
import { COMMON_TEXT } from '../constants/commonText';

export interface ApiErrorResponse {
  message: string;
  code?: string;
  status?: number;
}

export const handleApiError = (error: unknown): ApiErrorResponse => {
  if (error instanceof AxiosError) {
    if (error.response) {
      const data = error.response.data as { message?: string; error?: string };
      return {
        message: data.message || data.error || COMMON_TEXT.MESSAGES.GENERIC_ERROR,
        status: error.response.status,
      };
    }
    if (error.request) {
      return {
        message: COMMON_TEXT.MESSAGES.NETWORK_ERROR,
      };
    }
  }

  if (error instanceof Error) {
    return {
      message: error.message,
    };
  }

  return {
    message: COMMON_TEXT.MESSAGES.GENERIC_ERROR,
  };
};
