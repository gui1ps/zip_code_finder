import axios from "axios"
import returnApikey from "../Functions/returnApiKey";

const api_token=returnApikey();
const apiPexels= axios.create({
    headers:{
        'Authorization':api_token
    },
    baseURL:"https://api.pexels.com/v1/search?query="
})

export default apiPexels;
