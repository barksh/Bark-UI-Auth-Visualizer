/**
 * @author WMXPY
 * @namespace Routes
 * @description Sign In
 */

import { BarkPopupWindowModel } from "@barksh/client-authentication-browser";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { barkClient } from "../util/bark-client";

export const SignInView: React.FC = () => {

    const navigate = useNavigate();

    const [domain, setDomain] = React.useState('');

    const signInAction = async () => {

        const model: BarkPopupWindowModel = barkClient.createPopupWindowModel(
            domain,
        );

        const authenticationToken = await model.performInquiry();
        console.log(authenticationToken);

        navigate('/visualizer');
    };

    return (<div>
        SignIn
        <input
            value={domain}
            onChange={(event) => {
                setDomain(event.target.value);
            }}
            placeholder="Domain"
        />
        <button onClick={() => {
            signInAction();
        }}>SignIn</button>
    </div>);
};
