export interface IResponse {
  statusCode: number;
  data: Array<any> | Record<any, any>;
  message: string;
}
