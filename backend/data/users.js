import crypto from 'crypto';
const users = [
  {
    name: 'Admin User',
    email: 'admin@gmail.com',
    password: crypto
      .pbkdf2Sync('admin', 'salt123', 1000, 64, `sha512`)
      .toString(`hex`),
    isAdmin: true,
  },
  {
    name: 'sunny',
    email: 'sunny@gmail.com',
    password: crypto
      .pbkdf2Sync('sunny', 'salt123', 1000, 64, `sha512`)
      .toString(`hex`),
  },
  {
    name: 'micro',
    email: 'micro@gmail.com',
    password: crypto
      .pbkdf2Sync('micro', 'salt123', 1000, 64, `sha512`)
      .toString(`hex`),
  },
];

export default users;
