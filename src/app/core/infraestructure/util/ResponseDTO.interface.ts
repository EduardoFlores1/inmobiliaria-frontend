export interface ResponseDTO<T> {
  readonly status: number;
  readonly message: string;
  readonly data: T
}