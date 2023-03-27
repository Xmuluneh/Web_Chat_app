import { check, validationResult } from 'express-validator';
import createError from 'http-errors';
import path from 'path';
import User from('../../models/peoples.js')
//add validation for the user

const addValidators = [
  check('name')
    .isLength({ min: 1 })
    .isAlpha('en-US', { ignore: '-' })
    .withMessage('Name is required')
    .withMessage('Name is must be alphabet')
    .trim(),
  check('email').isEmail().withMessage('Invalid email address').trim().custom(async (value)=>{
    try{
        const user = await User.findOne({email: value});
        if(user){
            throw createError('Email in use');
        }
           
        }catch(err){
           throw createError(err.message);
        }
    
  }),
  check('mobile')
  .isMobilePhone('en-ZA','en-ZM','en-ET',{
    strictMode: true
  })
  .withMessage('Mobile Number must be a valid  county code')

];

export default addValidators;
