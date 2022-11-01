import axios from "axios";
import { useNavigate } from "react-router-dom";

function AxiosInterceptor() {
    const navigate = useNavigate();
    axios.interceptors.response.use(
        function (response) {
            console.log(response)
            return response;
        },
        function (er) {
            if (axios.isAxiosError(er)) {
                if (er.response) {
                    if (er.response.status == 403) {
                        navigate("/login");
                    }
                }
            }
            return Promise.reject(er);
        }
    );
}

export default AxiosInterceptor;