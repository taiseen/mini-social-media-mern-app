import { useEffect, useState } from 'react';
import axios from 'axios';


// Backend || Server ==> URL Address
const api = axios.create({ baseURL: 'http://localhost:3001/' });


// with every url request send user identification at server side for authentication...
// send user auth automatically every time with every request...
api.interceptors.request.use(req => {

    // 1st ==> get user token from LocalStorage, that server send to client...
    const token = JSON.parse(localStorage.getItem('jwt'))

    // 2nd ==> send this token from LocalStorage into server for user id tracking...
    // & we can see it by at browser Network Console
    token && (req.headers.authorization = `Bearer ${token}`);

    return req;
});



const useFetch = (endPoint) => {

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false);


    useEffect(() => {

        const fetchData = async () => {

            setLoading(true);
            try {
                const { data } = await api.get(endPoint);
                setData(data);
            } catch (error) {
                setError(error);
            }
            setLoading(false);
        }

        // function calling...
        fetchData();

    }, [endPoint]);

    return { data, loading, error };
}



export const useGetUser = (data) => useFetch(data);

// POST Requests
// 🟨🟨🟨🟨🟨🟨
export const userLogin = loginInfo => api.post('/auth/login', loginInfo);
export const userRegistration = newUserInfo => api.post('/auth/registration', newUserInfo);