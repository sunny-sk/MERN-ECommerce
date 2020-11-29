import mongoose from 'mongoose';
import crypto from 'crypto';
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    salt: String,
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true },
);

userSchema.methods.matchPassword = async function (enteredPass) {
  const hashedPassword = crypto
    .pbkdf2Sync(enteredPass, 'salt123', 1000, 64, `sha512`)
    .toString(`hex`);

  return this.password === hashedPassword;
};

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  this.password = crypto
    .pbkdf2Sync(this.password, 'salt123', 1000, 64, `sha512`)
    .toString(`hex`);
});

const User = mongoose.model('User', userSchema);

export default User;
