import {NextFunction, Request, Response} from "express";
import {getSupervisors, handleSubmit} from '../services/supervisor.service';
import {validationResult} from "express-validator";
import {SupervisorDetails} from "../types";

export const getSupervisorEndpoint = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const response = await getSupervisors();
        console.log("✅ Hello world"); // This must now appear
        res.status(200).json(response);
    } catch (error) {
        console.error("❌ Error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const handleSubmitEndpoint = (req: Request, res: Response): void => {
    console.log('📥 Incoming body:', req.body);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.error('❌ Validation errors:', errors.array());
        res.status(400).json({ errors: errors.array() });
        return;
    }

    const supervisorDetails: SupervisorDetails = req.body;
    handleSubmit(supervisorDetails);

    res.status(200).json({ message: 'Submission successful' });
};
