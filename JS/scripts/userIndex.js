var getCookie = require('getCookie.js');

function userIndex(){
  let json = JSON.parse(getCookie('steamjson'));
  let avatar = document.getElementById('avatar').src = json.avatar.large;
};

userIndex();