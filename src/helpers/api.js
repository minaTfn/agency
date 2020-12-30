import axios from "axios";

let baseUrl = (!process.env.NODE_ENV || process.env.NODE_ENV === 'development')
    ? 'http://192.168.7.24/api/v1/' : 'https://admin.reminitravel.ir/api/';

const request = axios.create({
    baseURL: baseUrl,
    auth: {
        username: 'tQxLglC7s85ubkJC9HtXHw2Jvfh-05Sf',
        password: '',
    },
});


export default {
    user: {
        login: (credentials) => request.post(`auth/login`, credentials).then((res) => res.data),
        fetchCurrentUser: () => request.get(`auth/user-profile`).then(res => res.data.data),
        editUserInfo: (data) => request.put(`auth/edit-profile`, data).then(res => res.data),
        list: (params) => request.get(`users`, params).then(res => res.data),
        create: (params) => request.post(`users`, params).then(res => res.data.data),
        update: (id, params) => request.put(`users/${id}`, params).then(res => res.data.data),
    },
    agency: {
        list: () => request.get(`agencies`).then(res => res.data.items),
    }
};
