var cookieGetter = require('getCookie.js');

function userIndex(){
  let json = JSON.parse(cookieGetter.getCookie('steamjson'));
  let avatar = document.getElementById('avatar').src = json.avatar.large;
};

userIndex();