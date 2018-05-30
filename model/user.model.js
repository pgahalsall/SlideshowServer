

var User = class {
    constructor(userId, username, password, mobile) {
        this.userId = userId;
        this.username = username;
        this.password = password;
        this.mobileNumber = mobile;
    }
}

module.exports = User;