import * as express from "express";
import { body, validationResult } from 'express-validator';
import dotenv from "dotenv";
import {getSupervisorEndpoint, handleSubmitEndpoint} from "../controller/supervisor.controller";
dotenv.config();
const router = express.Router();


router.post(
    '/submit',
    [
        body('firstName')
            .notEmpty().withMessage('First name is required')
            .isAlpha().withMessage('First name must contain only letters'),

        body('lastName')
            .notEmpty().withMessage('Last name is required')
            .isAlpha().withMessage('Last name must contain only letters'),

        body('supervisor')
            .notEmpty().withMessage('Supervisor is required'),

        body('email')
            .optional()
            .isEmail().withMessage('Invalid email format'),

        body('phoneNumber')
            .optional()
            .matches(/^[0-9\-\+\s\(\)]+$/).withMessage('Invalid phone number format')
    ],
    handleSubmitEndpoint
);


// GET /api/supervisors
// No need to import node-fetch
router.get('/supervisors',getSupervisorEndpoint);
export default router;
