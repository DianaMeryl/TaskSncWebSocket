/* eslint-disable no-undef */
'use strict';
const bcrypt = require('bcryptjs');

async function createUser() {
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash('1234567', salt); 

  return [{
    userID: 1,
    nickName: 'Benedict',
    passwordHash: passwordHash, 
    role: 'admin'
  }];
}


module.exports = createUser;