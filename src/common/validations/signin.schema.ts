import * as Joi from 'joi';

const signinSchema = Joi.object({
  mailID: Joi.string().email().required(),
  password: Joi.string().required(),
});

export { signinSchema };
