/* eslint-disable no-undef */
const { User } = require('../models');
const bcrypt = require('bcryptjs');
const tokenService = require('./token_service');
const ApiError = require('../exceptions/api_error');
const UserDto = require('../dtos/user_dto');

async function registration(nickName, password) {

  const candidate = await User.findOne({
    where: {
      nickName 
    }
  });
  
  if (candidate) {
    throw ApiError.BadRequest('Користувач з таким іменем вже існує!');
  }

  const hashPassword = await bcrypt.hash(password, 3);

  const user = await User.create({  
    nickName,
    passwordHash: hashPassword
  });

  const userDto = new UserDto(user);
  
  const tokens = tokenService.generateTokens({
    ...userDto 
  });

  try {

    await tokenService.saveToken(userDto.userID, tokens.refreshToken);
    console.log('Токен успішно збережено');
      
  } catch (error) {
    console.error('Помилка при збереженні токена:', error);
  }

  return {
    ...tokens,
    user: userDto
  };
}

async function login(nickName, password) {

  const user = await User.findOne({
    where: {
      nickName : nickName 
    } 
  });

  if(!user){
    throw ApiError.BadRequest('Користувача з такими даними не знайдено!');
  }
  const isPassequals = await bcrypt.compare(password, user.passwordHash);

  if(!isPassequals){
    throw ApiError.BadRequest('Невірний пароль!');
  }
  const userDto = new UserDto(user);
  const tokens = tokenService.generateTokens({
    ...userDto
  });

  await tokenService.saveToken(userDto.userID, tokens.refreshToken);
  return {
    ...tokens,
    user: userDto
  };
}

async function logout(refreshToken) {

  const token = await tokenService.removeToken(refreshToken);

  return token;
}

async function getAllUsers() {

  const users = await User.findAll();

  return users;
}


async function removeUser(userID){
  try {
    const userData = await User.destroy({
      where: {
        userID
      }
    });

    if (!userData) {
      throw new Error('User not found');
    }

    return {
      message: 'User successfully deleted' 
    };
  } catch (error) {
    console.error('Помилка при видаленні користувача:', error.message);
    throw error;
  }
}

module.exports = {
  registration,
  logout,
  login,
  getAllUsers,
  removeUser
};