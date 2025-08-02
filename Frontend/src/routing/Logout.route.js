import {createRoute} from "@tanstack/react-router"
import {rootRoute} from "./rootRoute";
import LogoutPage from "../pages/LogoutPage.jsx"

export const logoutRoute = createRoute({
    getParentRoute : ()=>rootRoute,
    path : "/logout",
    component : LogoutPage
})