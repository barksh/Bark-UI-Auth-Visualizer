/**
 * @author WMXPY
 * @namespace Util
 * @description Bark Client
 */

import { BarkAuthenticationClient } from "@barksh/client-authentication-browser";
import { EnvironmentVariables } from "./environment";

export const barkClient = BarkAuthenticationClient
    .create(EnvironmentVariables.clientDomain);

barkClient.addOnSignOutAction(() => {
    window.location.replace('/');
});
