import express from 'express';
import http from 'http';
import mongoose from 'mongoose';
import { config } from './config/config';
import Logs from './utils/Logging';
import UserRoutes from './routers/userRoute';

const router = express();

// mongo connection
mongoose
    .connect(config.mongo.url, { retryWrites: true, w: 'majority' })
    .then(() => {
        Logs.info('DB connected');
        startServer();
    })
    .catch((error) => {
        Logs.error('Unable to connect');
        Logs.error(error);
    });

//server connection
const startServer = () => {
    router.use((req, res, next) => {
        Logs.info(`Incoming  -> Method : [${req.method}] - Url : [${req.url}] - IP : [${req.socket.remoteAddress}]`);

        res.on('finish', () => {
            Logs.info(`Incoming  -> Method : [${req.method}] - Url : [${req.url}] - IP : [${req.socket.remoteAddress}] - Status : [${res.statusCode}]`);
        });

        next();
    });
    router.use(express.urlencoded({ extended: true }));
    router.use(express.json());
    router.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

        if (req.method == 'OPTIONS') {
            res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
            return res.status(200).json({});
        }

        next();
    });

    //routes
    router.use('/api/v1/user', UserRoutes);

    //healthCheck
    router.get('/healthCheck', (req, res, next) => {
        res.status(200).json({ message: 'Health Check is done' });
    });

    //Error Handling
    router.use((req, res, next) => {
        const error = new Error('not found');
        Logs.error(error);
        return res.status(404).json({ message: error.message });
    });

    //starting server
    http.createServer(router).listen(config.server.port, () => Logs.info(`Server is running on port ${config.server.port}`));
};
