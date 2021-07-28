const joi = require("joi");

const joiSchema = joi.object({
  title: joi.string().alphanum().min(3).max(20).required(),
  toDoDetail: joi.string().alphanum().max(200).required(),
  id: joi.string().alphanum().required(),
  createdBy:joi.string().required()
});

module.exports = joiSchema;
