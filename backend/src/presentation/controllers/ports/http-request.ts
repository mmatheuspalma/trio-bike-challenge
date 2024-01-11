import { Request } from "express";

export interface HttpRequest {
  token?: string;
  body: any;
  params: Request['params'];
}
