import axios from "axios";

function getLocalAccessToken() {
    const accessToken = window.localStorage.getItem("token");
    return accessToken;
}

const BackendService = axios.create({
    baseURL: 'http://127.0.0.1:8000/',
    withCredentials: true,
    headers: {
        "Content-type": 'application/json',
        "Accept": 'application/json',
    }
})

BackendService.interceptors.request.use(
    (config) => {
        const token = getLocalAccessToken();
        console.log('token :>> ', token);
        if (token) {
            config.headers["x-access-token"] = token;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// BackendService.interceptors.request.use(config => {
//     let token = ''

//     try {
//         let userStorage = localStorage.getItem('token')
//         let userStorageJSON = JSON.parse(userStorage)
//         token = userStorageJSON['token']
//     } catch (error) {
//         console.log(error);
//     }

//     console.log('token :>> ', token);
//     if (token) {
//         config.headers.Authorization = `Bearer ${token}`
//     }
//     return config
// })

// BackendService.interceptors.request.use(
//     config => {
//         let token = localStorage.getItem('token')
//         console.log('token :>> ', token);
//         if (token) {
//             config.headers.Authorization = `Bearer ${token}`;
//         }
//         return config;
//     },
//     error => {
//         Promise.reject(error)
//     });

export default BackendService