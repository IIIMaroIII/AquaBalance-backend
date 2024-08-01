import { Router } from 'express';

import { waterRouter } from './waterRouter.js';
import { usersRouter } from './usersRouter.js';

export const router = Router();

router.use('/v1/users', usersRouter);

router.use('/v1/water', waterRouter);
