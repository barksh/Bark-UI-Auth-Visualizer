/**
 * @author WMXPY
 * @namespace Model
 * @description Cross Site Registerer
 */

import { PostRedeemV1ProxyResponse } from "@barksh/authentication-types";
import { requestBarkRedeemV1, RequestBarkRefreshV1Response, requestBarkRefreshV1 } from "@barksh/client-authentication-browser";
import { BarkModelConfiguration } from "./configuration";

export type BarkCrossSiteRegistererAction = () => void
    | Promise<void>;

export abstract class BarkCrossSiteRegisterer {

    protected readonly _configuration: BarkModelConfiguration;

    protected readonly registerActions: BarkCrossSiteRegistererAction[];

    protected constructor(configuration: BarkModelConfiguration) {

        this._configuration = configuration;

        this.registerActions = [];
    }

    public async register(): Promise<void> {

        for (const action of this.registerActions) {
            await Promise.resolve(action());
        }
    }

    protected addAction(action: BarkCrossSiteRegistererAction): this {

        this.registerActions.push(action);
        return this;
    }

    protected async redeemInquiry(hiddenKey: string): Promise<string> {

        const redeemResult: PostRedeemV1ProxyResponse = await requestBarkRedeemV1(
            this._targetDomain,
            {
                hiddenKey,
                overrideTargetHost: this._overrideTargetModuleHost,
            },
        );

        return redeemResult.refreshToken;
    }

    protected async refreshToken(refreshToken: string): Promise<string> {

        const refreshResult: RequestBarkRefreshV1Response = await requestBarkRefreshV1(
            this._targetDomain,
            {
                refreshToken,
                overrideTargetHost: this._overrideTargetModuleHost,
            },
        );

        return refreshResult.authenticationToken;
    }
}
