import axios from "axios";

const axiosClient = axios.create({
    baseURL:'http://localhost:4000',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
})

axiosClient.interceptors.request.use(async (config)=>config);
axiosClient.interceptors.response.use((response)=>{
    if(response && response.data)
    {
        return response.data;
    }
    return response;
}, error=>{
    throw Error(error);
})
export default axiosClient;