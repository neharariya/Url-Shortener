import {createRoute} from "@tanstack/react-router"
import {rootRoute} from "./rootRoute";
import DashBoardPage from "../pages/DashBoardPage.jsx"

export const dashboardRoute = createRoute({
    getParentRoute : ()=>rootRoute,
    path : "/dashboard",
    component : DashBoardPage
})