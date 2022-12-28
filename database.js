const mongoose = require('mongoose');

const _userName = process.env.MONGOUSER;
const _password = process.env.MONGOPASSWORD;
const _hostname = process.env.MONGOHOSTNAME;
const _dbName = 'voter';
const _userCollectionName = 'user';
const _candidateCollectionName = 'candidate';

if (!_userName)
  throw Error('Database not configured. Set environment variables');

const userSchema = new mongoose.Schema({
  email: String,
  votes: [{ type: String }],
});
exports.UserCol = mongoose.model(_userCollectionName, userSchema);

const candidateSchema = new mongoose.Schema({
  name: String,
  url: String,
  votes: Number,
  id: String,
});
exports.CandidateCol = mongoose.model(
  _candidateCollectionName,
  candidateSchema
);

const dbUrl = `mongodb+srv://${_userName}:${_password}@${_hostname}/${_dbName}`;
mongoose.connect(dbUrl);
