/**
 * @author WMXPY
 * @namespace Views_Visualize
 * @description Visualize
 */

import { Code, Tab, Table } from "@barksh/bark-design-react";
import { BarkAuthenticationToken } from "@barksh/token-browser";
import * as React from "react";

export type VisualizeAuthenticationViewProps = {

    readonly token: BarkAuthenticationToken;
};

export const VisualizeAuthenticationView: React.FC<VisualizeAuthenticationViewProps> = (props: VisualizeAuthenticationViewProps) => {

    const token: BarkAuthenticationToken = props.token;

    return (<Tab
        title="Authentication Token"
    >
        <Code
            language="raw"
            copyButton="Copy Token"
            wrap
        >
            {token.getRawToken()}
        </Code>
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
                <tr>
                    <td>Issued At</td>
                    <td>{token.getIssueAtDate().toLocaleString()}</td>
                </tr>
                <tr>
                    <td>Expired At</td>
                    <td>{token.getExpireAtDate().toLocaleString()}</td>
                </tr>
            </tbody>
        </Table>
    </Tab>);
};
