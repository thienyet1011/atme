import nextConnect from 'next-connect';

import { NextApiRequest, NextApiResponse } from 'next';
import { verify } from 'jsonwebtoken';

import {secretKey} from './keys';

export interface NextApiRequestExtended extends NextApiRequest {
  _id: number | null;
  username: string | null;
}

export default function getHandler() {
  return nextConnect<NextApiRequestExtended, NextApiResponse>({
  onError(error, req, res) {
    res.status(501).json({ error: `Sorry something wrong! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  },
}).use((req, res, next) => {
  req._id = null;
  req.username = null;

  const { authorization } = req.headers;

  if (!authorization) {
    next();
  } else {
    verify(authorization, secretKey, (error: any, decoded: any) => {
      if (!error && decoded) {
        req._id = decoded._id;
        req.username = decoded.name;
      }

      next();
    });
  }
})};