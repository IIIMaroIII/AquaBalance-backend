import mongoose from 'mongoose';
import { Services } from '../services/index.js';
import { ResponseMaker } from '../utils/responseMaker.js';
import { HttpError } from '../utils/HttpError.js';

const addWaterVolumeController = async (req, res) => {
  const { waterValue, date } = req.body;

  const volumeRecord = await Services.water.addWaterVolume({
    waterValue,
    date,
    userId: req.user._id,
  });
  res.json(
    ResponseMaker(201, 'Successfully add a water volume!', volumeRecord),
  );
};

const editWaterVolumeController = async (req, res, next) => {
  const { chosenCardId } = req.params;
  const { waterValue, date } = req.body;

  const volumeRecord = await Services.water.updateWaterVolume({
    chosenCardId,
    userId: req.user._id,
    date,
    waterValue,
  });

  res.json(
    ResponseMaker(201, 'Successfully edited a water volume!', volumeRecord),
  );
};

const deleteWaterVolumeController = async (req, res, next) => {
  const { chosenCardId } = req.params;

  const volumeRecord = await Services.water.deleteWaterVolume(
    req.user.id,
    chosenCardId,
  );
  if (!volumeRecord) return next(HttpError(404, 'Record not found'));
  res.status(204).send();
};

const getDailyWaterVolumeController = async (req, res, next) => {
  const { chosenDate } = req.query;

  const data = await Services.water.getDailyWaterVolume({
    userId: req.user._id,
    chosenDate,
  });

  res.json(
    ResponseMaker(
      200,
      'You’ve successfully fetched your volumes for the chosen day!',
      data,
    ),
  );
};

const getMonthlyWaterVolumeController = async (req, res, next) => {
  const { chosenDate } = req.query;
  console.log('chosenDate in controller', chosenDate);

  const data = await Services.water.getMonthlyWaterVolume({
    userId: req.user._id,
    chosenDate,
  });

  res.json(
    ResponseMaker(
      200,
      'You’ve successfully fetched your monthly volumes!',
      data,
    ),
  );
};

export const water = {
  addWaterVolumeController,
  editWaterVolumeController,
  deleteWaterVolumeController,
  getDailyWaterVolumeController,
  getMonthlyWaterVolumeController,
};
