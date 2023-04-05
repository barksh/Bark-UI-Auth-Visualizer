/**
 * @author WMXPY
 * @namespace Views_SignIn
 * @description Sign In
 */

import { Button, ButtonGroup, Card, InputText, LoadingContainerRectangle } from "@barksh/bark-design-react";
import { BarkPopupWindowModel, BarkRedirectModel } from "@barksh/client-authentication-browser";
import * as React from "react";
import { HiSparkles, HiSun } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { barkClient } from "../../util/bark-client";
import { SignInContainer } from "./styles/container";

export const SignInView: React.FC = () => {

    const navigate = useNavigate();

    const [loading, setLoading] = React.useState(false);
    const [domain, setDomain] = React.useState('');

    const popUpAction = async () => {

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

    const redirectAction = async () => {

        const model: BarkRedirectModel = barkClient.createRedirectModel(
            'expose-key',
            domain,
        );

        try {

            await model.performInquiry();
        } catch (error) {
            console.log(error);
            setLoading(false);
            return;
        }
    };

    return (<SignInContainer>
        <Card
            loading={loading}
            loadingProvider={LoadingContainerRectangle}
            loadingPlaceholder="Loading..."
            headerTitle="Sign In"
            minWidth="min(512px, 100vw)"
            maxWidth="768px"
            actions={<ButtonGroup>
                <Button
                    actionPrefix
                    prefix={<HiSparkles
                        size={18}
                    />}
                    onClick={() => {
                        setLoading(true);
                        popUpAction();
                    }}
                >
                    Pop Up
                </Button>
                <Button
                    actionPrefix
                    prefix={<HiSun
                        size={18}
                    />}
                    onClick={() => {
                        setLoading(true);
                        redirectAction();
                    }}
                >
                    Redirection
                </Button>
            </ButtonGroup>}
        >
            <InputText
                maximize
                size="large"
                placeholder="Target domain"
                title="Target Domain"
                information="Target domain to sign in"
                value={domain}
                onChange={(value: string) => {
                    setDomain(value);
                }}
            />
        </Card>
    </SignInContainer>);
};
