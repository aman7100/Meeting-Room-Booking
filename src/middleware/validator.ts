import { Request, Response, NextFunction } from 'express';
import Joi, { ObjectSchema, ValidationResult } from 'joi';

type ValidationType = 'body' | 'params' | 'query';
function validateRequest(validationType: ValidationType, schema: ObjectSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const data = req[validationType];
    const { error }: ValidationResult<any> = schema.validate(data);
    if (error) {
      return res.status(400).json({
        message: 'Validation error',
        details: error.details,
      });
    }
    next();
  };
}
const userCreationSchema = Joi.object({
  name: Joi.string().min(3).max(40).required(),
  password: Joi.string().min(6).max(40).required(),
  role:Joi.string().min(4).required(),
  loggedUser: Joi.object()
});

const roomQuerySchema = Joi.object({
  startDate: Joi.date().required(),
  endDate: Joi.date().required(),
});
export { validateRequest, userCreationSchema, roomQuerySchema }