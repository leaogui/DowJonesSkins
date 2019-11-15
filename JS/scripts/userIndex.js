/* jshint esversion:8 */
import { getCookie } from './getCookie.js';

function userIndex(){
  let json = JSON.parse(getCookie('steamjson'));
  let avatar = document.getElementById('avatar');

  if (avatar != null){
    avatar.src = json.avatar.large;
  }
}

userIndex();