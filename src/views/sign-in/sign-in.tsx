/**
 * @author WMXPY
 * @namespace Views_SignIn
 * @description Sign In
 */

import { Button, ButtonGroup, Card, InputText, LoadingContainerRectangle } from "@barksh/bark-design-react";
import { BarkPopupWindowModel } from "@barksh/client-authentication-browser";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { barkClient } from "../../util/bark-client";
import { SignInContainer } from "./styles/container";

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

    return (<SignInContainer>
        <Card
            loading={loading}
            loadingProvider={LoadingContainerRectangle}
            loadingPlaceholder="Loading..."
            headerTitle="Sign In"
            width="58%"
            actions={[
                <ButtonGroup key="group">
                    <Button
                        onClick={() => {
                            setLoading(true);
                            signInAction();
                        }}
                    >
                        Pop Up
                    </Button>
                    <Button
                        disabled
                    >
                        Redirection
                    </Button>
                </ButtonGroup>
            ]}
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
