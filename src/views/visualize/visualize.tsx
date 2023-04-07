/**
 * @author WMXPY
 * @namespace Views_Visualize
 * @description Visualize
 */

import { Button, Card, Tabs, useTabs } from "@barksh/bark-design-react";
import { BarkAuthenticationToken, BarkRefreshToken } from "@barksh/token-browser";
import * as React from "react";
import { HiOutlineLogout } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { barkClient } from "../../util/bark-client";
import { VisualizeAuthenticationView } from "./authentication";
import { VisualizeRefreshView } from "./refresh";
import { VisualizeContainer } from "./styles/container";

export const VisualizeView: React.FC = () => {

    const [authenticationToken, setAuthenticationToken] = React.useState<BarkAuthenticationToken | null>(null);
    const [refreshToken, setRefreshToken] = React.useState<BarkRefreshToken | null>(null);

    const navigate = useNavigate();

    const controller = useTabs();

    const verifyToken = async () => {

        const aToken = await barkClient.getAuthenticationToken();
        const rToken = await barkClient.getRefreshToken();

        if (!aToken || !rToken) {
            navigate('/loading');
            return;
        }

        setAuthenticationToken(aToken);
        setRefreshToken(rToken);
    };

    React.useEffect(() => {
        verifyToken();
    }, []);

    if (authenticationToken && refreshToken) {
        return (<VisualizeContainer>
            <Card
                headerTitle={`Hello, ${authenticationToken.getAccountIdentifier()}`}
                minWidth="min(512px, 100vw)"
                minHeight="min(256px, 100vh)"
                maxWidth="768px"
                noPadding
                actions={<Button
                    actionPrefix
                    prefix={<HiOutlineLogout
                        size={18}
                    />}
                    onClick={() => {
                        barkClient.signOut();
                    }}
                >
                    Sign Out
                </Button>}
            >
                <Tabs
                    controller={controller}
                    noBorder
                >
                    <VisualizeAuthenticationView
                        token={authenticationToken}
                    />
                    <VisualizeRefreshView
                        token={refreshToken}
                    />
                </Tabs>
            </Card>
        </VisualizeContainer>);
    }

    return (<VisualizeContainer>
        Loading
    </VisualizeContainer>);
};
