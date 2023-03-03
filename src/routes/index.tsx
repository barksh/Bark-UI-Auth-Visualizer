/**
 * @author WMXPY
 * @namespace Routes
 * @description Index
 */

import * as React from "react";
import { BarkPopupWindowModel } from "../aa/src/model/popup-window";

export const IndexView: React.FC = () => {

    const [domain, setDomain] = React.useState('');

    const signInAction = async () => {

        const model: BarkPopupWindowModel = BarkPopupWindowModel.fromDomains(
            'auth-visualizer.bark.sh',
            'bark.sh',
        );
        model.overrideTargetModuleHost('http://localhost:4000');
        model.overrideTargetUIHost('http://localhost:5173');

        model.performInquiry();
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
