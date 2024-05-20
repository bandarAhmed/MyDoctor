const {validationResult, body } = require('express-validator');

 const UserValidationResult = ()=>{
    return [
        body('email').notEmpty().isEmail().withMessage('حقل البريد مطلوب'),
        body('name').notEmpty().withMessage('حقل الاسم مطلوب'),
        body('password').notEmpty().withMessage('ججب ان تكون كلمه المرور اكثر من خمس خانات'),
        body('password').notEmpty().isLength({min: 5}).withMessage('ججب ان تكون كلمه المرور اكثر من خمس خانات'),
    ]
};
const validate = (req, res, next)=>{
    const errors = validationResult(req)
    const takeJustMessage = []
    errors.array().map(err=> takeJustMessage.push({
        [err.path]: err.msg
    }))
    if(errors.isEmpty()) {
        return next()
    }
    return res.status(400).json({errors: takeJustMessage})
};

module.exports = {
    UserValidationResult, validate
};