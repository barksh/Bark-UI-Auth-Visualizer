/**
 * @author WMXPY
 * @namespace Routes
 * @description Visualize
 */

import { BarkAuthenticationToken } from "@barksh/token-browser";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { barkClient } from "../util/bark-client";

export const VisualizeView: React.FC = () => {

    const [token, setToken] = React.useState<BarkAuthenticationToken | null>(null);

    const navigate = useNavigate();

    const verifyToken = async () => {

        const authenticationToken = await barkClient.getAuthenticationToken();

        if (!authenticationToken) {
            navigate('/loading');
            return;
        }
        setToken(authenticationToken);
    };

    React.useEffect(() => {
        verifyToken();
    }, []);

    if (token) {
        return (<div>
            Visualize
            <br />
            {token.getAccountIdentifier()}
            <br />
            {token.getRawToken()}
            <br />
            <button onClick={() => {
                barkClient.signOut();
            }}>Sign Out</button>
        </div>);
    }

    return (<div>
        Loading
    </div>);
};
