import * as React from "react";
import axios from 'axios';
import {useEffect, useState} from "react";
const NotificationForm: React.FC = () => {
    const [supervisors, setSupervisors] = useState<string[]>([]);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        supervisor: '',
        notifyByEmail: false,
        notifyByPhone: false,
    });

    const [message, setMessage] = useState('');

    useEffect(() => {
        axios.get('http://localhost:5000/api/supervisors')
            .then(res => {
                if (Array.isArray(res.data)) {
                    setSupervisors(res.data);
                } else {
                    console.error("Supervisors is not an array:", res.data);
                    setSupervisors([]);
                }
            })
            .catch(err => {
                console.error("Failed to fetch supervisors", err);
                setSupervisors([]);
            });
    }, []);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;

        if (type === 'checkbox') {
            const checked = (e.target as HTMLInputElement).checked;
            setFormData(prev => ({
                ...prev,
                [name]: checked,
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value,
            }));
        }
    };


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await axios.post('/api/submit', {
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.notifyByEmail ? formData.email : '',
                phoneNumber: formData.notifyByPhone ? formData.phoneNumber : '',
                supervisor: formData.supervisor,
            });

            setMessage('Submitted successfully!');
            setFormData({
                firstName: '',
                lastName: '',
                email: '',
                phoneNumber: '',
                supervisor: '',
                notifyByEmail: false,
                notifyByPhone: false,
            });
        } catch (error: any) {
            setMessage(error?.response?.data?.message || 'Submission failed.');
        }
    };

    return (
        <div className="max-w-[1000px] h-[700px] md:h-[600px] mx-auto bg-gray-200 rounded-t-md mt-10 flex flex-col gap-y-8">
            <h2 className="text-2xl font-bold text-center bg-gray-500 text-white rounded-t-md py-2 mb-6">Notification Form</h2>
            <form onSubmit={handleSubmit} className="space-y-4 w-[90%] mx-auto mt-10">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1">
                        <label className="block text-sm font-medium mb-1">First Name</label>
                        <input type="text" name="firstName" value={formData.firstName} onChange={handleChange}
                               className="w-full bg-white px-3 py-2 focus:outline-none focus:ring-0" required/>
                    </div>
                    <div className="flex-1">
                        <label className="block text-sm font-medium mb-1">Last Name</label>
                        <input type="text" name="lastName" value={formData.lastName} onChange={handleChange}
                               className="w-full bg-white px-3 py-2 focus:outline-none focus:ring-0" required/>
                    </div>
                </div>

                <p className="text-gray-600 font-medium">How would you prefer to be notified?</p>
                <div className="flex flex-col md:flex-row items-center gap-4">
                    <div className="w-full md:flex-1 flex flex-col">
                        <div className="flex items-center gap-2">
                            <input type="checkbox" name="notifyByEmail" checked={formData.notifyByEmail}
                                   onChange={handleChange}/>
                            <label>Email</label>
                        </div>
                        <input type="text" name="email" value={formData.email} onChange={handleChange}
                               className="w-full bg-white px-3 py-2 focus:outline-none focus:ring-0" required/>
                    </div>
                    <div className="w-full md:flex-1 flex flex-col">
                        <div className="flex items-center gap-2">
                            <input type="checkbox" name="notifyByPhone" checked={formData.notifyByPhone}
                                   onChange={handleChange}/>
                            <label>Phone Number</label>
                        </div>
                        <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange}
                               className="w-full bg-white px-3 py-2 focus:outline-none focus:ring-0" required/>
                    </div>

                </div>

                <div className="flex gap-4">
                    <div className="flex-1">
                        {formData.notifyByEmail && (
                            <>
                                <label className="block text-sm font-medium mb-1">Email</label>
                                <input type="email" name="email" value={formData.email} onChange={handleChange}
                                       className="w-full border px-3 py-2 rounded"/>
                            </>
                        )}
                    </div>
                    <div className="flex-1">
                        {formData.notifyByPhone && (
                            <>
                                <label className="block text-sm font-medium mb-1">Phone Number</label>
                                <input type="tel" name="phoneNumber" value={formData.phoneNumber}
                                       onChange={handleChange}
                                       className="w-full border px-3 py-2 rounded"/>
                            </>
                        )}
                    </div>
                </div>

                <div className="mx-auto w-full md:w-[50%] flex flex-col justify-center gap-y-3">
                    <label className="block text-sm font-medium mb-1">Supervisor</label>
                    <select name="supervisor" value={formData.supervisor} onChange={handleChange}
                            className="w-full bg-white px-3 py-2 focus:outline-none focus:ring-0 mx-auto">
                        <option value="">Select...</option>
                        {supervisors?.map((s, index) => (
                            <option key={index} value={s}>{s}</option>
                        ))}
                    </select>
                </div>

                <button type="submit" className="block mx-auto w-[70%] md:w-[30%] bg-gray-600 text-white py-2 rounded hover:bg-gray-700">SUBMIT
                </button>

                {message && <p className="text-center mt-4 text-sm text-green-700">{message}</p>}
            </form>
        </div>
    );
};

export default NotificationForm;
