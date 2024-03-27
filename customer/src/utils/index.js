const bcrypt = require("bcrypt");

const saltRounds = 10;
module.exports.GenerateSalt = async () => {
  return await bcrypt.genSalt();
};

module.exports.GenerateHash = async (password, salt) => {
  return await bcrypt.hash(password, salt);
};

module.exports.ValidatePassword = async (password, hashPassword, salt) => {
  return (await this.GenerateHash(password, salt)) === hashPassword;
};
