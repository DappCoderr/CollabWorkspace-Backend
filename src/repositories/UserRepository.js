import { crudRepository } from './crudRepository.js';
import User from '../schema/UserSchema.js';

const UserRepository = {
  ...crudRepository(User),
  getByEmail: async ({ email }) => await User.findOne({ email }).exec(),
};

export default UserRepository;
