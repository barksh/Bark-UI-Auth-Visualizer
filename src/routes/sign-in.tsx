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

    const [loading, setLoading] = React.useState(false);
    const [domain, setDomain] = React.useState('');

    const signInAction = async () => {

        const model: BarkPopupWindowModel = barkClient.createPopupWindowModel(
            domain,
        );

        try {

            const authenticationToken = await model.performInquiry();
            console.log(authenticationToken);
            navigate('/visualizer');
        } catch (error) {
            console.log(error);
            setLoading(false);
            return;
        }
    };

    return (<div>
        SignIn
        <input
            value={domain}
            disabled={loading}
            onChange={(event) => {
                setDomain(event.target.value);
            }}
            placeholder="Domain"
        />
        <br />
        <button
            disabled={loading}
            onClick={() => {
                setLoading(true);
                signInAction();
            }}
        >SignIn</button>
        <br />
        {loading ? 'Loading...' : null}
    </div>);
};
