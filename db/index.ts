// https://www.freemysqlhosting.net/account/

import mysql, { Connection } from 'mysql';

const connectionConfig = {
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
};

export const connect = () => {
  return new Promise<Connection>((resolve, reject) => {
    const connection = mysql.createConnection(connectionConfig);
    connection.connect((error) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(connection);
    });
  });
};

export const query = <T>(connection: Connection, sql: string, params: any) => {
  return new Promise<T>((resolve, reject) => {
    const handler = (error, result) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(result);
    };

    connection.query(sql, params, handler);
  });
};