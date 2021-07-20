import nextConnect from 'next-connect';
import Cors, { CorsOptions } from 'cors';

import { NextApiRequest, NextApiResponse } from 'next';
import { verify } from 'jsonwebtoken';

import {secretKey} from './keys';

const corsOptions: CorsOptions = {
  origin: "*",
  allowedHeaders: ['Context-Type', 'Authorization'],
  methods: ['GET', 'DELTE', 'POST', 'PUT'],
}

const cors = Cors(corsOptions);

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function enableCors(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result)
      }

      return resolve(result)
    })
  })
}

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
})
// .use(async (req, res, next) => {
//   // Run the middleware
//   try {
//     const result = await enableCors(req, res, cors);
//     next();
//   }
//   catch(err) {
//     return  res.status(200).json({
//       payload: {
//         success: true,
//         status: 200,
//         error: `Sorry something wrong! ${err.message}`
//       },
//     });
//   }
// })
.use((req, res, next) => {
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