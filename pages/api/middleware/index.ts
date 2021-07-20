import nextConnect from 'next-connect';
import Cors from 'cors';

import { NextApiRequest, NextApiResponse } from 'next';
import { verify } from 'jsonwebtoken';

import {secretKey} from './keys';

export interface NextApiRequestExtended extends NextApiRequest {
  _id: number | null;
  username: string | null;
}

const enableCors = (middleware) => {
  return (req, res) =>
    new Promise((resolve, reject) => {
      middleware(req, res, (result) => {
        if (result instanceof Error) {
          return reject(result)
        }
        return resolve(result)
      })
    });
}

export default function getHandler() {
  return nextConnect<NextApiRequestExtended, NextApiResponse>({
  onError(error, req, res) {
    res.status(501).json({ error: `Sorry something wrong! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  },
}).use(async (req, res, next) => {
  const corsOptions = {
    origin: ["https://objective-chandrasekhar-589973.netlify.app", "http://localhost:3000"],
    methods: ["GET", "DELTE", "POST", "PUT"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: false,
  };

  const cors = enableCors(
    Cors(corsOptions)
  );

  // Run cors
  await cors(req, res);

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