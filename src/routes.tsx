/**
 * @author WMXPY
 * @namespace AuthVisualizer
 * @description Routes
 */

import * as React from "react";
import { createBrowserRouter } from "react-router-dom";
import { IndexView } from "./routes/index";

const routes = [
    {
        path: "/",
        element: <IndexView /> as React.ReactElement,
    },
];

export const browserRouter = createBrowserRouter(routes, {
});
