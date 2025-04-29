import { useState } from 'react';
import axios from 'axios';
import { signUp } from 'aws-amplify/auth';

const useRegister = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const registerUser = async (credentials) => {
        setLoading(true);
        setError(null);

        try {
            const { username, password, name } = credentials;
            const signUpResult = await signUp({
                username,
                password,
                attributes: {
                    name,
                },
            });

            const userId = signUpResult.userSub;
            const apiUrl = process.env.SIGN_UP_API_URL;
            const response = await axios.post(`${apiUrl}/register`, {
                userId,
                boards: [],
            });

            return response.data;
        } catch (err) {
            setError(err.response?.data?.message || err.message || 'An error occurred');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return { registerUser, loading, error };
};

export default useRegister;