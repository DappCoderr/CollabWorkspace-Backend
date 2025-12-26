import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a name'],
      trim: true,
      unique: true,
      minlength: [3, 'Name must be at least 3 characters'],
    },
    email: {
      type: String,
      required: [true, 'Please provide an email'],
      trim: true,
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
    role: {
      type: String,
      enum: ['Owner', 'Collaborator', 'Viewer'],
      default: 'Viewer',
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre('save', function modifyPassword(next) {
  const user = this;
  const SALT = bcrypt.genSaltSync(9);
  const hashPassword = bcrypt.hashSync(user.password, SALT);
  user.password = hashPassword;
  next();
});

const User = mongoose.model('User', userSchema);

export default User;
