/**
 * @author WMXPY
 * @namespace Model
 * @description Cross Site Model
 */

import { InquiryAction } from "@barksh/authentication-types";
import { requestBarkInquiryV1 } from "@barksh/client-authentication-browser";

export class BarkCrossSiteModel {

    protected readonly _selfDomain: string;
    protected readonly _targetDomain: string;

    private _performed: boolean = false;

    private _overrideTargetModuleHost: string | undefined;
    private _overrideTargetUIHost: string | undefined;

    private readonly _actions: InquiryAction[];

    protected constructor(selfDomain: string, targetDomain: string) {

        this._selfDomain = selfDomain;
        this._targetDomain = targetDomain;

        this._overrideTargetModuleHost = undefined;
        this._overrideTargetUIHost = undefined;

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

    protected async inquiryForRedirectUrl(): Promise<string> {

        const inquiryResponse = await requestBarkInquiryV1(
            this._targetDomain,
            {
                domain: this._selfDomain,
                actions: this._actions,
                overrideTargetHost: this._overrideTargetModuleHost,
                overrideTargetUIHost: this._overrideTargetUIHost,
            }
        );

        return inquiryResponse.redirectUrl;
    }
}
