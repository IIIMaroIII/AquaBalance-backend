import { Models } from '../db/models/index.js';
import { HttpError } from '../utils/HttpError.js';
import { getStartAndEndOfDay } from '../utils/getStartAndEndOfDay.js';
import { getStartAndEndOfMonth } from '../utils/getStartAndEndOfMonth.js';

const addWaterVolume = async ({ userId, date, waterValue }) => {};

const updateWaterVolume = async ({
  chosenCardId,
  userId,
  date,
  waterValue,
}) => {};

const deleteWaterVolume = async (userId, id) => {};

const getDailyWaterVolume = async ({ userId, chosenDate }) => {};

const getMonthlyWaterVolume = async ({ userId, chosenDate }) => {};

export const water = {
  addWaterVolume,
  updateWaterVolume,
  deleteWaterVolume,
  getDailyWaterVolume,
  getMonthlyWaterVolume,
};
