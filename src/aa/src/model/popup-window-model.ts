/**
 * @author WMXPY
 * @namespace Model
 * @description Popup Window Model
 */

import { InquiryActionType } from "@barksh/authentication-types";
import { RequestBarkInquiryV1Response } from "..";
import { sleepWithTimeOut } from "../../../util/sleep";
import { BarkModelConfiguration } from "./configuration";
import { BarkCrossSiteModel } from "./cross-site-model";

export class BarkPopupWindowModel extends BarkCrossSiteModel {

    public static fromConfiguration(targetDomain: string, configuration: BarkModelConfiguration): BarkPopupWindowModel {

        return new BarkPopupWindowModel(targetDomain, configuration);
    }

    private _exposureKey: string | null;
    private _hiddenKey: string | null;

    private constructor(targetDomain: string, configuration: BarkModelConfiguration) {

        super(targetDomain, configuration);

        this._exposureKey = null;
        this._hiddenKey = null;
    }

    public async performInquiry(): Promise<string> {

        this.prePerformCheck();

        this.addAction({
            type: InquiryActionType.CLOSE,
            payload: undefined,
        });

        const inquiryResponse: RequestBarkInquiryV1Response =
            await this.requestInquiry();

        this._exposureKey = inquiryResponse.exposureKey;
        this._hiddenKey = inquiryResponse.hiddenKey;

        const newWindow: Window | null = window.open(inquiryResponse.redirectUrl, '_blank', 'width=600,height=1200');

        if (!newWindow) {
            throw new Error('[Bark] Failed to open new window');
        }

        while (!newWindow.closed) {
            await sleepWithTimeOut(1000);
        }

        if (!this._exposureKey) {
            throw new Error('[Bark] No exposure key');
        }
        if (!this._hiddenKey) {
            throw new Error('[Bark] No hidden key');
        }

        const refreshToken: string = await this.redeemInquiry(this._hiddenKey);

        const authenticationToken: string = await this.refreshToken(refreshToken);

        await this._configuration.persistStorageObject({
            refreshToken,
            authenticationToken,
        });

        return refreshToken;
    }
}
