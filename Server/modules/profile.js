const {Sequelize} = require('sequelize');
const db = require('./db');


const Profile = db.define("Profile", {
    spechlazation: {type: Sequelize.DataTypes.STRING, unique: true},
    address: {type: Sequelize.DataTypes.STRING},
    workingHours: {type: Sequelize.DataTypes.STRING},
    phone: {type: Sequelize.DataTypes.STRING},

},{
    timestamps: false,
});
Profile.associte  = models => {
    Profile.belongsTo(models.User)
}
module.exports = Profile