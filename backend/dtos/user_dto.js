/* eslint-disable no-undef */
class UserDto {
  userID;
  nickName;
  passwordHash;
  role;
    
  constructor(model){
    this.userID = model.userID;
    this.nickName = model.nickName;
    this.passwordHash = model.passwordHash;
    this.role = model.role;
  }
};
module.exports = UserDto;