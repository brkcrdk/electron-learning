type ApiResponseType<T> =
  | {
      success: true;
      data: T;
    }
  | {
      success: false;
      error: string;
    };

export type ApiResponseProps<T> = Promise<ApiResponseType<T>>;
