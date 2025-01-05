import axios from "axios";

 export const baseUrl = import.meta.env.VITE_BASE_URL || '/api/v1';

 export const axiosInstance = axios.create({
    baseURL: baseUrl,
    withCredentials: true,
 })

 axios.interceptors.request.use(
    (config) => {
        if(!window.navigator.onLine){
            console.log('No internet connection')
        }
        if(!config.headers){
            config.headers = new axios.AxiosHeaders()
        }
        if(config?.data instanceof FormData){
            config.headers['Content-Type'] = 'multipart/form-data';

        }else{
            config.headers['Content-Type'] = 'application/json';
        }
        // You can modify the config object here if needed
        return config;
    },
    (error)=>{  
        return Promise.reject(error)
    }
 )

 axios.interceptors.response.use(
    (response)=> {
        return response;
    },
    async (error) => {
        if(error.response){
            if(error.response.status === 401){
                try {
                    const {data} = await axiosInstance.post("/user/refreshToken", {
                        withCredentials: true
                    });
                    axios.defaults.headers.common ["Authorization"] = `Bearer ${data.accessToken}`;
                    return axiosInstance;
                } catch (error) {
                    console.log(error);
                    return Promise.reject(error);
                }
            }
            if(error.response.status === 403){
                console.log('Forbidden')
            }
            if(error.response.status === 404){
                console.log('Not Found')
            }
            if(error.response.status === 500){
                console.log('Server Error')
            }
        }
        throw error;

    }
 )


