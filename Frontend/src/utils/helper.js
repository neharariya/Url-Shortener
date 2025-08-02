import {login} from "../store/slice/authSlice";
import {redirect} from "@tanstack/react-router"; //redirect is a function
import {getCurrentUser} from "../api/user.api.js";

//we cannpot use usenavigate hook outiside of a react componentn use redirect here to redirect to login page

export const checkAuth = async ({context})=>{
    try{

        const store = context.store;
    const queryClient = context.queryClient;
    const user = await queryClient.ensureQueryData({
        queryKey: ['currentUser'],
        queryFn: getCurrentUser,
        retry:false,
    });

    store.dispatch(login(user));

    }catch(error){
        console.log(error);
        return redirect({to: "/login"})
    }
}