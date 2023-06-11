import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import User from '../models/User';

const createUser = (req: Request, res: Response, next: NextFunction) => {
    const { name, phone, location } = req.body;
    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        name,
        phone,
        location
    });

    return user
        .save()
        .then(() => {
            res.status(200).json({ status: res.statusCode, message: 'User Created', data: user });
        })
        .catch((error) => {
            res.status(500).json({ status: res.statusCode, message: error.message });
        });
};

const updateUser = (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    return User.findById(id)
        .then((user) => {
            if (user) {
                user.set(req.body);
                return user
                    .save()
                    .then((user) => {
                        res.status(200).json({ status: res.statusCode, message: 'User Updated', data: user });
                    })
                    .catch((error) => {
                        res.status(500).json({ status: res.statusCode, message: error.message });
                    });
            } else {
                res.status(404).json({ status: res.statusCode, message: 'User Id Not Found' });
            }
        })
        .catch((error) => {
            res.status(500).json({ status: res.statusCode, message: error.message });
        });
};

const deleteUser = (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    return User.findByIdAndDelete(id)
        .then((user) => {
            user ? res.status(200).json({ status: res.statusCode, message: 'User Viewed Deleted' }) : res.status(404).json({ status: res.statusCode, message: 'User Id Not Found' });
        })
        .catch((error) => {
            res.status(500).json({ status: res.statusCode, message: error.message });
        });
};

const readAllUser = (req: Request, res: Response, next: NextFunction) => {
    return User.find()
        .then((users) => {
            res.status(200).json({ status: res.statusCode, message: 'User Listed', data: users });
        })
        .catch((error) => {
            res.status(500).json({ status: res.statusCode, message: error.message });
        });
};

const readSingleUser = (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    return User.findById(id)
        .then((user) => {
            user ? res.status(200).json({ status: res.statusCode, message: 'User Viewed', data: user }) : res.status(404).json({ status: res.statusCode, message: 'User Id Not Found' });
        })
        .catch((error) => {
            res.status(500).json({ status: res.statusCode, message: error.message });
        });
};

export default { createUser, readAllUser, readSingleUser, updateUser, deleteUser };
