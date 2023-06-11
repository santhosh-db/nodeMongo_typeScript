import Joi, { ObjectSchema } from 'joi';
import { NextFunction, Request, Response } from 'express';
import { IUser } from '../models/User';
import Logs from '../utils/Logging';

export const ValidateJoi = (schema: ObjectSchema) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await schema.validateAsync(req.body);

            next();
        } catch (error) {
            Logs.error(error);

            return res.status(422).json({ error });
        }
    };
};

export const Schemas = {
    user: {
        create: Joi.object<IUser>({
            name: Joi.string().required(),
            phone: Joi.string()
                .length(10)
                .pattern(/^[0-9]+$/)
                .required(),
            location: Joi.string().required()
        }),
        update: Joi.object<IUser>({
            name: Joi.string().optional(),
            phone: Joi.string()
                .length(10)
                .pattern(/^[0-9]+$/)
                .optional(),
            location: Joi.string().optional()
        })
    }
};
