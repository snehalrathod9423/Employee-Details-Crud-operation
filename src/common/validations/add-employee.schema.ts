import * as Joi from 'joi';

export const addEmployeeSchema = Joi.object({
  name: Joi.string().required(),

  mailID: Joi.string()
    .email()
    .required(),

  mobile: Joi.string()
    .length(10)
    .pattern(/^[0-9]+$/)
    .required(),

  role: Joi.string()
    .valid('Admin', 'Manager', 'Employee')
    .required(),
});
