import mongoose from 'mongoose';
import { Services } from '../services/index.js';
import { ResponseMaker } from '../utils/responseMaker.js';
import { HttpError } from '../utils/HttpError.js';
import { parseISO } from 'date-fns';

const addWaterVolumeController = async (req, res) => {
  // const { _id: userId } = req.user._id;
  const data = await Services.water.addWaterVolume({
    ...req.body,
    // userId     
  })
  res.status(201).json({
        status: 201,
        message: 'Successfully add a water volume!',
        data,
  });
};

const editWaterVolumeController = async (req, res) => {
  const { chosenCardId } = req.params;
  // const { _id: userId } = req.user;
  const result = await Services.water.updateWaterVolume({ _id: chosenCardId }, req.body);

  res.json({
    status: 200,
    message: "Successfully edited a water volume!",
    data: result.value,
  }
)
};

const deleteWaterVolumeController = async (req, res, next) => {};

const getDailyWaterVolumeController = async (req, res, next) => {};

const getMonthlyWaterVolumeController = async (req, res, next) => {};

export const water = {
  addWaterVolumeController,
  editWaterVolumeController,
  deleteWaterVolumeController,
  getDailyWaterVolumeController,
  getMonthlyWaterVolumeController,
};
