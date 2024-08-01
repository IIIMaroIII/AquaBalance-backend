import { DIR } from './constants/constants.js';
import { initMongoConnection } from './db/initMongoConnection.js';
import { setupServer } from './server.js';
import { createDirIfDoesntExist } from './utils/createDirIfDoesntExist.js';

(async () => {
  try {
    await initMongoConnection();
    await createDirIfDoesntExist(DIR.TEMP);
    await createDirIfDoesntExist(DIR.UPLOAD);
    setupServer();
  } catch (error) {
    console.log(error);
  }
})();
