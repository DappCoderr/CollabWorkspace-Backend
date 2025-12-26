import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a name'],
      trim: true,
      minlength: [3, 'Name must be at least 3 characters'],
      unique: true,
    },
    email: {
      type: String,
      required: [true, 'Please provide an email'],
      trim: true,
      lowercase: true,
      unique: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        'Please provide a valid email',
      ],
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      minlength: [4, 'Password must be at least 4 characters'],
      select: false,
    },
  },
  { timestamps: true }
);

userSchema.pre('save', function () {
  const user = this;
  const SALT = bcrypt.genSaltSync(9);
  const hashPassword = bcrypt.hashSync(user.password, SALT);
  user.password = hashPassword;
});

const User = mongoose.model('User', userSchema);

export default User;
