const {Sequelize} = require('sequelize');
const db = require('./db');


const User = db.define("User", {
    email: {type: Sequelize.DataTypes.STRING, unique: true, required: true},
    name: {type: Sequelize.DataTypes.STRING, required: true, unique: false,},
    password: {type: Sequelize.DataTypes.STRING, required: true},
    userType: {type: Sequelize.DataTypes.ENUM('doctor' , 'normal')},
    latitude: {type: Sequelize.DataTypes.FLOAT, required: false},
    longitude: {type: Sequelize.DataTypes.FLOAT, required: false},
});
// tell the User models you have one childern useing hasOne()
User.associte = modles=> {
    User.hasOne(modles.Profile)
}

module.exports = User