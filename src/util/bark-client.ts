/**
 * @author WMXPY
 * @namespace Util
 * @description Bark Client
 */

import { BarkAuthenticationClient } from "../aa/src";

export const barkClient = BarkAuthenticationClient
    .create('auth-visualizer.bark.sh');
