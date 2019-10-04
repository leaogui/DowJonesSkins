let setUserInfos = (json, sessao) => {
    if (sessao){
        let avatar = document.getElementById('avatar').src = json.avatar.large;
        let userName = document.getElementById('avatar').src = json.username;
    };
};

module.exports = setUserInfos;