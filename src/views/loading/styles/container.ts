/**
 * @author WMXPY
 * @namespace Views_Loading_Styles
 * @description Container
 */

import { BarkThemeProps } from "@barksh/bark-design-react";
import styled, { StyledComponent } from "styled-components";

export const LoadingContainer: StyledComponent<"div", BarkThemeProps, any> =
    styled.div`
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
`;
