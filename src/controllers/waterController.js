import mongoose from 'mongoose';
import { Services } from '../services/index.js';
import { ResponseMaker } from '../utils/responseMaker.js';
import { HttpError } from '../utils/HttpError.js';
import { parseISO } from 'date-fns';

const addWaterVolumeController = async (req, res) => {};

const editWaterVolumeController = async (req, res, next) => {};

const deleteWaterVolumeController = async (req, res, next) => { };



const getDailyWaterVolumeController = async (req, res, next) => {
  const { chosenDate } = req.query;

  const data = await Services.water.getDailyWaterVolume({
    userId: req.user._id,
    chosenDate,
  });

  if (data.length === 0) {
    return next(HttpError(200, `You do not have any daily volumes!`, data));
  }

  res.json(
    ResponseMaker(
      200,
      "You’ve successfully fetched your volumes for the chosen day!",
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

  if (!data) {
    return next(HttpError(404, `You do not have any monthly volumes!`));
  }
  res.json(
    ResponseMaker(
      200,
      "You have successfully fetched your monthly volumes!",
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
