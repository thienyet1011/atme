import fs from 'fs';
import nextConnect from 'next-connect';
import multiparty from 'multiparty';
import path from 'path';

import { NextApiRequestExtended } from '../middleware';
import { NextApiResponse, NextApiRequest } from 'next';
import { getValueAsString } from 'utils';

interface UploadFile {
    fieldName: string,
    originalFilename: string,
    path: string,
    size: number,
};

const middleware = nextConnect();

middleware.use(async (req: NextApiRequestExtended, res, next) => {
    const tempDir = path.join(__dirname, "tmp"); 
    const uploadDir = path.join(__dirname, "uploads"); 

    // Make temp folder
    if (!fs.existsSync(tempDir)) {
        fs.mkdirSync(tempDir);
    }

    // Make uploads folder
    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir);
    }

    const form = new multiparty.Form({
        autoFiles: true,
        uploadDir: tempDir,
    });

    await form.parse(req, (err, fields, files) => {
        if (err) console.log('error: ', err.message);
        req.files = files;
        next();
    });
});

const handler = nextConnect();
handler.use(middleware);

handler.get(async (req: NextApiRequestExtended, res: NextApiResponse) => {
    console.log('query: ', req.query);    

    const filename = getValueAsString(req.query.filename) || undefined;
    if (filename) {
        const filePath = path.join(__dirname, "uploads", filename);

        if(fs.existsSync(filePath)) {
            const buffer = fs.readFileSync(filePath);
            res.setHeader('Content-Type', 'image/*');
            return res.send(buffer);
        }
        else return res.status(400).end();
    }
})

handler.post(async (req: NextApiRequestExtended, res: NextApiResponse) => {
    const { files } = req;
    if (files) {
        const uploads: UploadFile[] = files.upload;
        const file: UploadFile = uploads[0];
        const targetPathUrl = path.join(__dirname, "uploads", file.originalFilename);

        console.log("File: ", file);

        if ([".png", ".jpg", ".jpeg"].includes(path.extname(file.originalFilename).toLowerCase())) {
            console.log("Target: ", targetPathUrl);
            fs.copyFileSync(file.path, targetPathUrl);
            fs.unlinkSync(file.path);

            return res
              .status(200)
              .json({
                uploaded: true,
                url: `${process.env.BASEURL}/api/uploads/?filename=${file.originalFilename}`,
              });
        }
        else return res.status(400).json({uploaded: false});
    }
});

export const config = {
  api: {
    bodyParser: false,
  },
};
  
export default handler;

