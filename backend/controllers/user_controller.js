/* eslint-disable no-undef */
const UserService = require('../services/user_service');
const ApiError = require('../exceptions/api_error');
const { validationResult } = require('express-validator');
const {Token}  = require('../models');

async function registration(req, res, next) {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      throw ApiError.BadRequest('Помилка при валідації', errors.array());
    }

    const {nickName, password} = req.body;
        
    const userData = await UserService.registration(nickName, password);

    res.cookie('refreshToken', userData.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000, 
      httpOnly: true
    });

    return res.json(userData);
  } catch (err) {
    next(err);
  }
}

async function login(req, res, next) {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      throw ApiError.BadRequest('Помилка при валідації', errors.array());
    }

    const { nickName, password } = req.body;

    const userData = await UserService.login(nickName, password);

    res.cookie('refreshToken', userData.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000, 
      httpOnly: true
    });

    res.cookie('accessToken', userData.accessToken, {
      httpOnly: true,
      maxAge: 15 * 60 * 1000 
    });

    return res.json(userData);
  } catch (err) {
    next(err);
  }
}

async function logout(req, res, next) {
  try {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
      console.log('No refreshToken in cookies');
      return res.status(400).json({
        message: 'No refresh token provided' 
      });
    }

    const token = await UserService.logout(refreshToken);

    res.clearCookie('refreshToken');

    if (token) {
      console.log('Token successfully deleted');
    } else {
      console.log('Token not found');
    }

    return res.json(token);
  } catch (err) {
    console.error('Error in logout:', err);
    next(err);
  }
}

async function getUsers(req, res, next) {
  try {
    const users = await UserService.getAllUsers();
    return res.json(users);
  } catch (err) {
    next(err);
  }
}

async function removeUser(req, res, next) {
  try {
    const userID = req.params.userID;

    await Token.destroy({
      where: {
        userID 
      }
    });    
    const userData = await UserService.removeUser(userID);

    return res.json(userData);
  } catch (err) {
    next(err);
  }
}
module.exports = {
  registration,
  login,
  logout,
  getUsers,
  removeUser
};