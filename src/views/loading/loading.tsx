/**
 * @author WMXPY
 * @namespace Views_Loading
 * @description Loading
 */

import * as React from "react";
import { useNavigate } from "react-router-dom";
import { barkClient } from "../../util/bark-client";
import { LoadingContainer } from "./styles/container";

export const LoadingView: React.FC = () => {

    const navigate = useNavigate();

    const verifyToken = async () => {

        const token = await barkClient.getAuthenticationToken();

        if (!token) {
            navigate('/sign-in');
            return;
        }

        const verifyResult = token.verifyExpiration();

        if (verifyResult) {
            navigate('/visualizer');
            return;
        } else {
            navigate('/sign-in');
            return;
        }
    };

    React.useEffect(() => {
        verifyToken();
    }, []);

    return (<LoadingContainer>
        Loading
    </LoadingContainer>);
};
