/**
 * @author WMXPY
 * @namespace AuthVisualizer
 * @description Entry
 */

import * as React from "react";
import { RouterProvider } from "react-router-dom";
import { browserRouter } from "./routes";

export const EntryView: React.FC = () => {

    return (<RouterProvider
        router={browserRouter}
    />);
};
