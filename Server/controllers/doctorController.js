const {Sequelize} = require('sequelize');
const models = require('../modules');

const Op = Sequelize.Op;

exports.index = async (req, res)=>{
    let {q} = req.query;
    const searchQuery = q ? {name: {[Op.like]: `${q.replace(' ', '')}`}} : {}
    try {
        const doctor = await models.User.findAll({
            where: {userType:'doctor', ...searchQuery},
            include: {model: models.Profile, as: "Profile"},
            attributes: {exclude: 'password, id, userType'}
        });
        res.status(200).json({doctor: doctor})
    } catch (e) {
        res.status(500).json(e.message)
    }
}