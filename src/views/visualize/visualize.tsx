/**
 * @author WMXPY
 * @namespace Views_Visualize
 * @description Visualize
 */

import { Button, Card, Table } from "@barksh/bark-design-react";
import { BarkAuthenticationToken } from "@barksh/token-browser";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { barkClient } from "../../util/bark-client";
import { VisualizeContainer } from "./styles/container";

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
        return (<VisualizeContainer>
            <Card
                bodyTitle={`Hello, ${token.getAccountIdentifier()}`}
                width="50%"
                actions={[
                    <Button
                        key="sign-out"
                        onClick={() => {
                            barkClient.signOut();
                        }}
                    >
                        Sign Out
                    </Button>
                ]}
            >
                <pre>
                    <code data-lang="raw" style={{
                        whiteSpace: 'pre-wrap',
                    }}>
                        {token.getRawToken()}
                    </code>
                </pre>

                <Table
                    fixedLayout
                >
                    <tbody>
                        <tr>
                            <td>Account Identifier</td>
                            <td>{token.getAccountIdentifier()}</td>
                        </tr>
                        <tr>
                            <td>Authenticator</td>
                            <td>{token.getTargetDomain()}</td>
                        </tr>
                        <tr>
                            <td>Application</td>
                            <td>{token.getSelfDomain()}</td>
                        </tr>
                        <tr>
                            <td>Token Identifier</td>
                            <td>{token.getTokenIdentifier()}</td>
                        </tr>
                    </tbody>
                </Table>
            </Card>

        </VisualizeContainer>);
    }

    return (<VisualizeContainer>
        Loading
    </VisualizeContainer>);
};
