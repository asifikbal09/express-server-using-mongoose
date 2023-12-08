import { Schema, model } from 'mongoose';
import { TUser } from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../config';

const userSchema = new Schema<TUser>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    needsPasswordChange: {
      type: Boolean,
      default: true,
    },
    role: {
      type: String,
      enum: ['admin', 'student', 'faculty'],
    },
    status: {
      type: String,
      enum: ['in-progress', 'blocked'],
      default: 'in-progress',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

//pre save middleware / hook
userSchema.pre('save', async function (next) {
  // console.log(this, 'we will save data.');
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  // hashing the password
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcryptSaltRound),
  );
  next();
});

//post save middleware / hook
userSchema.post('save', async function (doc, next) {
  doc.password = '';
  next();
});

export const User = model<TUser>('User', userSchema);
