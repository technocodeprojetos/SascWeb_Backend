import crypto from 'crypto';
import multer from 'multer';
import { resolve } from 'path';

const uploadFolder = resolve(__dirname, '..', 'Upload');

export const uploadfile = {
    uploadFolder,
    storage: multer.diskStorage({
        destination: uploadFolder,
        filename: (request, file, callback) => {
            const fileHash = crypto.randomBytes(16).toString('hex');
            const fileName = `${fileHash}-${file.originalname}`;
            return callback(null, fileName);
        },
    }),
};


/* export const storageTypes = {
    local: multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, path.resolve(__dirname, "..", "..", "tmp", "uploads"));
      },
      filename: (req, file, cb) => {
        crypto.randomBytes(16, (err, hash) => {
          if (err) cb(err);
  
          file.key = `${hash.toString("hex")}-${file.originalname}`;
  
          cb(null, file.key);
        });
      }
    }),
}; */
