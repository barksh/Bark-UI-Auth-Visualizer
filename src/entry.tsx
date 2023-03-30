/**
 * @author WMXPY
 * @namespace AuthVisualizer
 * @description Entry
 */

import { Theme } from "@barksh/bark-design-react";
import * as React from "react";
import { RouterProvider } from "react-router-dom";
import { browserRouter } from "./routes";

export const EntryView: React.FC = () => {

    return (<Theme>
        <RouterProvider
            router={browserRouter}
        />
    </Theme>);
};
