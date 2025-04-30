import axios from 'axios';
import {SuperVisor, SupervisorDetails} from '../types';
import * as dotenv from 'dotenv';

dotenv.config();

export const getSupervisors = async (): Promise<string[]> => {
    const apiUrl = process.env.MANAGERS_API || 'https://o3m5qixdng.execute-api.us-east-1.amazonaws.com/api/managers';
    const { data } = await axios.get<SuperVisor[]>(apiUrl);

    return data
        .filter((s) => isNaN(Number(s.jurisdiction)))
        .sort((a, b) =>
            a.jurisdiction.localeCompare(b.jurisdiction) ||
            a.lastName.localeCompare(b.lastName) ||
            a.firstName.localeCompare(b.firstName)
        )
        .map((s) => `${s.jurisdiction} - ${s.lastName}, ${s.firstName}`);
};

export const handleSubmit = (supervisorDetails: SupervisorDetails)=>{
    console.log('✅ Form submitted:', supervisorDetails);
}
