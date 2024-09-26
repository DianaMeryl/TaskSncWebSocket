/* eslint-disable no-undef */
const { body } = require('express-validator');

const userValidationRules = () => {
  return [
    body('nickName').isString().withMessage('Name - має бути в текстовому форматі'),
    body('passwordHash').isLength({
      min: 3,
      max: 32 
    }).withMessage('Password - кількість символів в межах від 3 до 32')
  ];
};

module.exports =  {
  userValidationRules 
};