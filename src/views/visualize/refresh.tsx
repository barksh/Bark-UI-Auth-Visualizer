/**
 * @author WMXPY
 * @namespace Views_Visualize
 * @description Refresh
 */

import { Code, Tab, Table } from "@barksh/bark-design-react";
import { BarkRefreshToken } from "@barksh/token-browser";
import * as React from "react";

export type VisualizeRefreshViewProps = {

    readonly token: BarkRefreshToken;
};

export const VisualizeRefreshView: React.FC<VisualizeRefreshViewProps> = (props: VisualizeRefreshViewProps) => {

    const token: BarkRefreshToken = props.token;

    return (<Tab
        title="Refresh Token"
    >
        <Code
            language="raw"
            copyButton="Copy Token"
            noBorder
            noMargin
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
