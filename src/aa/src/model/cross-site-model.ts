/**
 * @author WMXPY
 * @namespace Model
 * @description Cross Site Model
 */

import { InquiryAction, PostRedeemV1ProxyResponse } from "@barksh/authentication-types";
import { RequestBarkRefreshV1Response } from "@barksh/client-authentication-browser";
import { requestBarkInquiryV1, RequestBarkInquiryV1Response, requestBarkRedeemV1, requestBarkRefreshV1 } from "..";
import { BarkModelConfiguration } from "./configuration";

export abstract class BarkCrossSiteModel {

    protected readonly _targetDomain: string;
    protected readonly _configuration: BarkModelConfiguration;

    protected _overrideTargetModuleHost: string | undefined;
    protected _overrideTargetUIHost: string | undefined;

    private _performed: boolean = false;

    private readonly _actions: InquiryAction[];

    protected constructor(targetDomain: string, configuration: BarkModelConfiguration) {

        this._targetDomain = targetDomain;
        this._configuration = configuration;

        this._actions = [];
    }

    public overrideTargetModuleHost(targetHost: string): this {

        this._overrideTargetModuleHost = targetHost;
        return this;
    }

    public overrideTargetUIHost(targetHost: string): this {

        this._overrideTargetUIHost = targetHost;
        return this;
    }

    protected addAction(action: InquiryAction): this {

        this._actions.push(action);
        return this;
    }

    protected prePerformCheck(): void {

        if (this._performed) {
            throw new Error('[Bark] Inquiry already performed');
        }
        this._performed = true;
    }

    protected async requestInquiry(): Promise<RequestBarkInquiryV1Response> {

        const inquiryResponse: RequestBarkInquiryV1Response = await requestBarkInquiryV1(
            this._targetDomain,
            {
                domain: this._configuration.getSelfDomain(),
                actions: this._actions,
                overrideTargetHost: this._overrideTargetModuleHost,
                overrideTargetUIHost: this._overrideTargetUIHost,
            }
        );

        return inquiryResponse;
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
