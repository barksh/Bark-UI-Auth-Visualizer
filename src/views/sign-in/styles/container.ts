/**
 * @author WMXPY
 * @namespace Views_SignIn_Styles
 * @description Container
 */

import { BarkThemeProps } from "@barksh/bark-design-react";
import styled, { StyledComponent } from "styled-components";

export const SignInContainer: StyledComponent<"div", BarkThemeProps, any> =
    styled.div`
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
`;
