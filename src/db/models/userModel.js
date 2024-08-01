import { Schema, model } from 'mongoose';

const userSchema = new Schema(
  {
    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      required: 'Email address is required',
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        'Please fill a valid email address in lowercase. Examples of valid email addresses: john.doe@example.com, john-doe@example.com, john@example.co.uk,john.doe@example.co.in',
      ],
    },
    password: { type: String, required: [true, 'Password is required!'] },
    name: { type: String, default: null },
    gender: { type: String, default: null },
    dailyNorma: { type: String, default: 1.8 },
    weight: { type: String, default: null },
    photoUrl: { type: String, default: null },
    timeInSports: { type: Number, default: null },
  },
  { timestamps: true, versionKey: false },
);

userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

export const UserModel = model('users', userSchema);
