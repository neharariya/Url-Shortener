import {createRoute} from "@tanstack/react-router"
import {rootRoute} from "./rootRoute";
import DashBoardPage from "../pages/DashBoardPage.jsx"
import {checkAuth} from "../utils/helper.js";

export const dashboardRoute = createRoute({
    getParentRoute : ()=>rootRoute,
    path : "/dashboard",
    component : DashBoardPage,
    beforeLoad: checkAuth
})