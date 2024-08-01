import Joi from 'joi';

const addWaterSchema = Joi.object({
  // waterValue: Joi.number().required(),
  // date: Joi.date().required(),
});

const editWaterSchema = Joi.object({
  // waterValue: Joi.number().required(),
  // date: Joi.date().required(),
});

export const water = {
  addWaterSchema,
  editWaterSchema,
};
