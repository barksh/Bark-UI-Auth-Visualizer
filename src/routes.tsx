/**
 * @author WMXPY
 * @namespace AuthVisualizer
 * @description Routes
 */

import * as React from "react";
import { createHashRouter, Navigate } from "react-router-dom";
import { LoadingView } from "./views/loading/loading";
import { SignInView } from "./views/sign-in/sign-in";
import { VisualizeView } from "./views/visualize/visualize";

const routes = [
    {
        path: "/",
        element: <Navigate to="/loading" replace />
    },
    {
        path: "/sign-in",
        element: <SignInView /> as React.ReactElement,
    },
    {
        path: "/loading",
        element: <LoadingView /> as React.ReactElement,
    },
    {
        path: "/visualizer",
        element: <VisualizeView /> as React.ReactElement,
    },
];

export const browserRouter = createHashRouter(routes, {
});
