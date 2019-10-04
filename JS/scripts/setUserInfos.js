let setUserInfos = (json) => {
    if (req.session.user){
        let avatar = document.getElementById('avatar').src = json.avatar.large;
        let userName = document.getElementById('avatar').src = json.username;
    };
};

module.exports = setUserInfos;