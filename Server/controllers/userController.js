const bcrypt = require('bcrypt');
const models = require('../modules/index');
const jwt = require('jsonwebtoken');
const { where } = require('sequelize');



exports.register = async (req, res) => {
    const { email, name, password, userType, location, spechlazation, address, workingHours, phone} = req.body;
    try {
        const hashPassword = await bcrypt.hash(password, 10)
        const user = await models.User.create({
            email,
            name,
            password: hashPassword,
            userType,
            latitude: location.latitude,
            longitude: location.longitude,
        })
        if(userType === 'doctor'){
            const profile = await models.Profile.create({
                UserId: user.id,
                spechlazation,
                address, 
                workingHours, 
                phone
            })
        }
        res.status(200).json({ message: 'Welcone To myDoctor' })
    } catch (e) {
        res.status(500).json(e)
    }
}

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await models.User.findOne({ where: { email } });
        const authPassword = await bcrypt.compare(password, user.password)
        if (authPassword) {
            const token = await jwt.sign({ id: user.id, name: user.name, email: user.email, userType: user.userType}, process.env.JWT_SECRET)
            res.status(200).json({ accessToken: token })
        }
        else {
            res.status(401).json({ message: 'Invalid Password or email' })
        }
    } catch (e) {
        res.status(500).json(e.message)
    }
}
exports.updateUser = async (req, res) => {
    const { password, name } = req.body;
    const id = req.currentUser.id;
    try {
        const hashPassword = await bcrypt.hash(password, 10)
        await models.User.update({
            name,
            password: hashPassword
        }, { where: {id} });
        res.status(200).json({message: "Update seecssfuly"})
    } catch (e) {
        res.status(500).json(e)
    }
};

exports.me = async (req, res) => {
    const user = req.currentUser;
    res.json(user);
};

exports.getProfile = async (req, res)=> {
    try {
        const id = req.currentUser.id;
        const result = await models.User.findOne({
            where: id,
            include: [{model: models.Profile, as: "Profile"}],
            attributes: {exclude: ["password"]}
        })

        res.status(200).json(result)
    } catch (e) {
        res.status(404).json(e.message)
    }
};

exports.deletePro = async (req, res)=>{
    try {
        const user = await models.User.destroy({where: {id: req.currentUser.id}})
       res.status(200).json({message: 'Profile deleted seccessfully'})
    } catch (e) {
        res.status(500).json(e.message)
    }
}