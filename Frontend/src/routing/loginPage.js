import {createRoute} from "@tanstack/react-router"
import {rootRoute} from "./rootRoute";
import LoginPage from "../pages/LoginPage.jsx"

export const loginRoute = createRoute({
    getParentRoute : ()=>rootRoute,
    path : "/login",
    component : LoginPage
})