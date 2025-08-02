import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "./rootRoute.js";
import VerifyPasswordPage from "../pages/verifyPasswordPage.jsx";

export const verifyPasswordRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/verify-password/$id",
    component: VerifyPasswordPage
});