import { Models } from '../db/models/index.js';
import { HttpError } from '../utils/HttpError.js';
import { getStartAndEndOfDay } from '../utils/getStartAndEndOfDay.js';
import { getStartAndEndOfMonth } from '../utils/getStartAndEndOfMonth.js';

const addWaterVolume = async ({ userId, date, waterValue }) => {
  const volumeRecord = await Models.WaterModel.create({
    userId,
    date,
    volume: waterValue,
  });
  return volumeRecord;
};

const updateWaterVolume = async ({
  chosenCardId,
  userId,
  date,
  waterValue,
}) => {
  const volumeRecord = await Models.WaterModel.findOneAndUpdate(
    { _id: chosenCardId, userId },
    {
      date,
      volume: waterValue,
    },
    { new: true },
  );
  return volumeRecord;
};

const deleteWaterVolume = async (userId, id) => {
  const volumeRecord = await Models.WaterModel.deleteOne({
    _id: id,
    userId,
  });
  return volumeRecord;
};

const getDailyWaterVolume = async ({ userId, chosenDate }) => {
  const { start, end } = getStartAndEndOfDay(chosenDate);

  try {
    const dailyItems = await Models.WaterModel.find(
      {
        userId,
        date: { $gte: start, $lte: end },
      },
      {
        createdAt: 0,
        updatedAt: 0,
      },
    );

    return dailyItems;
  } catch (err) {
    console.log('err', err);
  }
};

const getMonthlyWaterVolume = async ({ userId, chosenDate }) => {
  const { start, end } = getStartAndEndOfMonth(chosenDate);

  try {
    const monthlyItems = await Models.WaterModel.find(
      {
        userId,
        date: { $gte: start, $lte: end },
      },
      {
        createdAt: 0,
        updatedAt: 0,
      },
    );

    return monthlyItems;
  } catch (err) {
    return HttpError(500, 'Internal server error', err);
  }
};

export const water = {
  addWaterVolume,
  updateWaterVolume,
  deleteWaterVolume,
  getDailyWaterVolume,
  getMonthlyWaterVolume,
};
