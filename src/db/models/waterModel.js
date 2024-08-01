import { model, Schema } from 'mongoose';
import { handleMongooseError } from '../../utils/handleMongooseError.js';

const waterSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
    volume: {
      type: Number,
      required: true,
      default: 50,
    },
    date: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true, versionKey: false },
);

waterSchema.post('save', handleMongooseError);

export const WaterModel = model('water', waterSchema);
