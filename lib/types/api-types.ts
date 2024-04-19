export type ListResponse<T> = {
  message: string;
  data: T[];
};

export type SingleResp<T> = {
  message: string;
  data: T;
};
