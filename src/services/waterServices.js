import { Models } from '../db/models/index.js';
import { HttpError } from '../utils/HttpError.js';
import { getStartAndEndOfDay } from '../utils/getStartAndEndOfDay.js';
import { getStartAndEndOfMonth } from '../utils/getStartAndEndOfMonth.js';

const addWaterVolume = data => Models.WaterModel.create(data);

const updateWaterVolume = async (filter, data, options = {}) => {
  const result = await Models.WaterModel.findOneAndUpdate(filter, data, {
    new: true,

    includeResultMetadata: true,
    ...options,
  });

  if (!result || !result.value) return null;

  return {
    data: result.value,
  };
};

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
