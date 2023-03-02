/**
 * @author WMXPY
 * @namespace AuthVisualizer
 * @description Main
 */

import React from "react";
import ReactDOM from "react-dom/client";
import { EntryView } from "./entry";

ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement,
).render(<React.StrictMode>
    <EntryView />
</React.StrictMode>);
