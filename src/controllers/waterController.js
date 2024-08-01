import mongoose from 'mongoose';
import { Services } from '../services/index.js';
import { ResponseMaker } from '../utils/responseMaker.js';
import { HttpError } from '../utils/HttpError.js';
import { parseISO } from 'date-fns';

const addWaterVolumeController = async (req, res) => {};

const editWaterVolumeController = async (req, res, next) => {};

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
