import multer from 'multer';
import { DIR } from '../constants/constants.js';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, DIR.TEMP);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, `${uniqueSuffix}_${file.originalname}`);
  },
});

export const upload = multer({ storage });
