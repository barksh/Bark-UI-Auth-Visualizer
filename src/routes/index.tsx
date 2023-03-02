/**
 * @author WMXPY
 * @namespace Routes
 * @description Index
 */

import { InquiryActionType } from "@barksh/authentication-types";
import { requestBarkInquiryV1, RequestBarkInquiryV1Response } from "@barksh/client-authentication-browser";
import * as React from "react";

export const IndexView: React.FC = () => {

    const [domain, setDomain] = React.useState('');

    const signInAction = async () => {

        const response: RequestBarkInquiryV1Response =
            await requestBarkInquiryV1(domain, {
                domain: 'auth-visualizer.bark.sh',
                actions: [{
                    type: InquiryActionType.CALLBACK,
                    payload: 'http://localhost:5174/?exposure-key={exposure-key}',
                }],
                overrideTargetHost: 'http://localhost:4000',
                overrideTargetUIHost: 'http://localhost:5173',
            });

        console.log(response);
    };

    return (<div>
        Index
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
