/* eslint-disable no-undef */
const ApiError = require('../exceptions/api_error');
const tokenService = require('../services/token_service');

module.exports = function(req, res, next){
  try{
    const token = req.cookies.accessToken;

    if(!token){
      return next(ApiError.UnauthorizedError());
    }

    const userData = tokenService.validateAccessToken(token);

    if (userData.role !== 'admin') {
      return res.status(403).json({
        message: 'Access forbidden: Admins only' 
      });
    }
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