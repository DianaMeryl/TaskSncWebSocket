/* eslint-disable no-undef */
const ApiError = require('../exceptions/api_error');
const tokenService = require('../services/token_service');

module.exports = function(req, res, next){
  try{
    const authorifizationHeader = req.headers.authorization;

    if(!authorifizationHeader){
      return next(ApiError.UnauthorizedError());
    }
    const accessToken = authorifizationHeader.split(' ')[1];
    if(!accessToken){
      return next(ApiError.UnauthorizedError());
    }
    const userData = tokenService.validateAccessToken(accessToken);
    if(!userData){
      return next(ApiError.UnauthorizedError());
    }
    req.user = userData;
    next();
  }
  catch(err){
    return next(ApiError.UnauthorizedError());
  }
};