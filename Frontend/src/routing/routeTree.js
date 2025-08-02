import {createRootRoute} from "@tanstack/react-router"
import RootLayout from "../RootLayout"
import {homePageRoute} from "./homePage.js"
import {registerRoute} from "./registerPage.js"
import {loginRoute} from "./loginPage.js"
import {dashboardRoute} from "./dashBoard.js"
import {rootRoute} from "./rootRoute.js"
import {verifyPasswordRoute} from "./verifyPassword.route.js"
import {logoutRoute} from "./Logout.route.js"

export const routeTree = rootRoute.addChildren([homePageRoute, loginRoute, registerRoute, dashboardRoute, verifyPasswordRoute, logoutRoute])