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
    name: { type: String },
    gender: { type: String },
    dailyNorma: { type: Number },
    weight: { type: Number },
    photoUrl: { type: String },
    activeTime: { type: Number },
  },
  { timestamps: true, versionKey: false },
);

userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

export const UserModel = model('users', userSchema);
