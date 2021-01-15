import axios from "axios";
import Vue from "vue";

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
        changePassword: (user_id, params) => request.put(`user/passwords/${user_id}`, params).then(res => res.data.data),
        list: (params = '') => request.get(`users?expand=agency&${params}`).then(res => res.data),
        create: (params) => request.post(`users`, params).then(res => res.data.data),
        update: (params) => request.put(`users/${params.id}`, params).then(res => res.data.data),
        delete: (params) => request.delete(`users/${params.id}`).then(res => res.data),
    },
    agency: {
        list: (params = '') => request.get(`agencies?${params}`).then(res => res.data),
        create: (params) => request.post(`agencies`, params).then(res => res.data.data),
        update: (params) => request.put(`agencies/${params.id}`, params).then(res => res.data.data),
        delete: (params) => request.delete(`agencies/${params.id}`).then(res => res.data),
    },
    goal: {
        list: (params = '') => request.get(`goals?expand=agency&${params}`).then(res => res.data),
        create: (params) => request.post(`goals`, params).then(res => res.data.data),
        update: (params) => request.put(`goals/${params.id}`, params).then(res => res.data.data),
        delete: (params) => request.delete(`goals/${params.id}`).then(res => res.data)
    },
    goalProfile: {
        list: (params = '') => request.get(`goal-profiles?expand=agency&${params}`).then(res => res.data),
        goals: (goalProfileID) => request.get(`goal-profiles/${goalProfileID}?expand=goalProfileGoals`).then(res => res.data),
        create: (params) => request.post(`goal-profiles`, params).then(res => res.data),
        update: (params) => request.put(`goal-profiles/${params.id}`, params).then(res => res.data.data),
        delete: (params) => request.delete(`goal-profiles/${params.id}`).then(res => res.data)
    }
};
