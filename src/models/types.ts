/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request } from 'express';
import { User } from './user';

interface BloglistRequest<
  Params = Record<string, string>,
  ResBody = any,
  ReqBody = any,
  ReqQuery = Record<string, any>
> extends Request<Params, ResBody, ReqBody, ReqQuery> {
  token?: string;
  user?: User;
}

export { BloglistRequest };
