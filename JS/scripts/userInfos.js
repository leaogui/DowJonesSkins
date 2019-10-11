var cookieGetter = require('getCookie.js');

function userInfos(){
  let json = JSON.parse(cookieGetter.getCookie('steamjson'));
  let avatar = document.getElementById('avatar').src = json.avatar.large;
  let avatarIcon = document.getElementById('avatarIcon').src = json.avatar.large;
  let userName = document.getElementById('userName').innerHTML  = json.username;
};

userInfos();