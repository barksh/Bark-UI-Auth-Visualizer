/**
 * @author WMXPY
 * @namespace Model
 * @description Popup Window
 */

import { InquiryActionType } from "@barksh/authentication-types";
import { sleepWithTimeOut } from "../util/sleep";
import { BarkCrossSiteModel } from "./cross-site-model";

export class BarkPopupWindowModel extends BarkCrossSiteModel {

    public static fromDomains(selfDomain: string, targetDomain: string): BarkPopupWindowModel {

        return new BarkPopupWindowModel(selfDomain, targetDomain);
    }

    private constructor(selfDomain: string, targetDomain: string) {

        super(selfDomain, targetDomain);
    }

    public async performInquiry(): Promise<void> {

        this.prePerformCheck();

        this.addAction({
            type: InquiryActionType.CLOSE,
            payload: undefined,
        });

        const redirectUrl: string = await this.inquiryForRedirectUrl();

        const newWindow: Window | null = window.open(redirectUrl, '_blank', 'width=600,height=1200');

        if (!newWindow) {
            throw new Error('[Bark] Failed to open new window');
        }

        while (!newWindow.closed) {
            console.log("WAITING");
            await sleepWithTimeOut(1000);
        }

        console.log("DONE");
    }
}
