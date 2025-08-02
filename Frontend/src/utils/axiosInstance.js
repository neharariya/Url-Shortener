import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000",
    timeout: 10000,
    withCredentials: true
});


 
// Handle common error responses
axiosInstance.interceptors.response.use(
  (response) => {
    // Return successful responses as-is
    return response;
  },
  (error) => {
    // Handle common errors
    console.log("🔍 Full error object:", error);
    console.log("🔍 Error response data:", error.response?.data);

    if (error.response) {
        const{status,data} = error.response;

        const errorMessage = data?.error || data?.message || "Unknown error";

        switch(status){
            case 400: console.error("Bad request:", errorMessage); break;

            case 404: console.error("Not found:", errorMessage); break;

            case 500: console.error("Internal server error:", errorMessage); break;

            default: console.error("Unknown error:", errorMessage); break;

        }
    }else if(error.request){
        console.error("No response received:", error.request);
    }else{
        console.error("Error:", error.message);
    }

    return Promise.reject({
        isAxiosError: true,
        message: error.response?.data?.error || error.response?.data?.message || error.message ||
        "An unknown error occurred.",
        status: error.response?.status || 500,
        data: error.response?.data,
        originalError: error
    })
    
  }
);