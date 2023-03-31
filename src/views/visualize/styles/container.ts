/**
 * @author WMXPY
 * @namespace Views_Visualize_Styles
 * @description Container
 */

import { BarkThemeProps } from "@barksh/bark-design-react";
import styled, { StyledComponent } from "styled-components";

export const VisualizeContainer: StyledComponent<"div", BarkThemeProps, any> =
    styled.div`
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        word-break: break-all;
`;
