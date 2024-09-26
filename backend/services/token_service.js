/* eslint-disable no-undef */
const jwt = require('jsonwebtoken');
const tokenModel = require('../models/token_model');

function generateTokens(payload){
  const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  } );

  const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN_REFRESH
  } );

  return {
    accessToken,
    refreshToken
  };
}

async function saveToken(userID, refreshToken){
  try {
    const tokenData = await tokenModel.findOne({
      where: {
        userID
      } 
    });
    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return await tokenData.save();
    }
    const token = await tokenModel.create({
      userID,
      refreshToken 
    });
    return token;
  } catch (error) {
    console.error('Помилка при збереженні токена:', error);
    throw error;
  }
}

async function removeToken(refreshToken){

  const tokenData = await tokenModel.destroy({
    where: {
      refreshToken: refreshToken 
    } 
  });

  return tokenData;
}

function validateAccessToken(token){
  try{
    const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    return userData;
  }
  catch(err){
    return null;
  }
}

function validateRefreshToken(token){
  try{
    const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    return userData;
  }
  catch(err){
    return null;
  }
}

async function findToken(refreshToken){

  const tokenData = await tokenModel.findOne({
    refreshToken
  });

  return tokenData;
}
module.exports = {
  generateTokens,
  saveToken,
  validateAccessToken,
  validateRefreshToken,
  removeToken,
  findToken

};