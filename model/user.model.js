
var User = class {
    constructor(userId, username, email, hash, salt, mobile) {
        this.userId = userId;
        this.username = username;
        this.email = email;
        this.hash = hash;
        this.salt = salt;
        this.mobileNumber = mobile;
    }
}

module.exports = User;