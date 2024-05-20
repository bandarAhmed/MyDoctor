import axios from "axios";
import {API_URL} from "./urls";

const instans = axios.create({
    baseURL: API_URL
})
export default instans;