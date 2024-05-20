const db = require('./db');
const User = require('./user');
const Profile = require('./profile');

const models = {
    User: User,
    Profile: Profile
};

Object.keys(models).forEach(key=> {
    if('associte' in models[key]){
        models[key].associte(models)
    }
});

module.exports = models