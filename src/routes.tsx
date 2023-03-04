/**
 * @author WMXPY
 * @namespace AuthVisualizer
 * @description Routes
 */

import * as React from "react";
import { createHashRouter, Navigate } from "react-router-dom";
import { LoadingView } from "./routes/loading";
import { SignInView } from "./routes/sign-in";
import { VisualizeView } from "./routes/visualize";

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
    }
];

export const browserRouter = createHashRouter(routes, {
});
