/* jshint esversion:8 */
import { getCookie } from './getCookie.js';

function userInfos(){
  let json = JSON.parse(getCookie('steamjson'));
  let avatar = document.getElementById('avatar');
  let avatarIcon = document.getElementById('avatarIcon');
  let userName = document.getElementById('userName');
  if (avatar != null){
    avatar.src = json.avatar.large;
  }
  if (avatarIcon != null){
    avatarIcon.src = json.avatar.large;
  }
  if (userName != null){
    userName.innerHTML  = json.username;
  }
}

userInfos();