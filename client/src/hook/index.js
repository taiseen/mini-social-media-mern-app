import { useEffect, useState } from 'react';
import store from "../redux";
import axios from 'axios';

// Backend || Server ==> URL Address
const api = axios.create({ baseURL: process.env.REACT_APP_SERVER_URL });

// with every url request send user identification at server side for authentication...
// send user auth automatically every time with every request...
api.interceptors.request.use(req => {

    // 1st ==> get user token from Redux store, that server send to client...
    const token = store.getState().auth.token;

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

        // 🟨🟨🟨 function definition...
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

        // 🟩🟩🟩 function calling...
        fetchData();

    }, [endPoint]);

    return { data, loading, error };
}


// 🟨🟨🟨🟨🟨🟨🟨🟨
// 🟨 REST api call 🟨
// 🟨🟨🟨🟨🟨🟨🟨🟨


// GET Requests...
// 🟩🟩🟩🟩🟩🟩
export const useGetUser = userID => useFetch('/users/' + userID);


// GET      /:id/friends
// PATCH    /:id/:friendId

// posts
// GET      /
// GET      /:userId/posts
// POST     /
// POST     /:id/like

// POST Requests...
// 🟨🟨🟨🟨🟨🟨
export const userLogin = loginInfo => api.post('/auth/login', loginInfo);
export const userRegistration = newUserInfo => api.post('/auth/registration', newUserInfo);