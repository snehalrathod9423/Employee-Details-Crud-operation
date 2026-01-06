import * as Joi from 'joi';

const signupSchema = Joi.object({
  name: Joi.string().required(),

  mailID: Joi.string().email().required(),

  password: Joi.string().min(8).max(12).required(),

  mobile: Joi.string()
    .length(10)
    .pattern(/^[0-9]+$/)
    .required(),

  role: Joi.string().valid('Admin', 'Manager').required(),
});

export { signupSchema };
