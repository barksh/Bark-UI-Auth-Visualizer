/**
 * @author WMXPY
 * @namespace Model
 * @description Query Registerer
 */

import { BarkTempObject } from "../storage/declare";
import { BarkModelConfiguration } from "./configuration";
import { BarkCrossSiteRegisterer } from "./cross-site-registerer";

export class BarkQueryRegistererRegisterer extends BarkCrossSiteRegisterer {

    public static create(queryKey: string, configuration: BarkModelConfiguration): BarkQueryRegistererRegisterer {

        return new BarkQueryRegistererRegisterer(queryKey, configuration);
    }

    private constructor(queryKey: string, configuration: BarkModelConfiguration) {

        super(configuration);

        this.addAction(async () => {

            const urlParams: URLSearchParams = new URLSearchParams(window.location.search);
            const queryValue: string | null = urlParams.get(queryKey);

            if (queryValue) {

                const tempObject: BarkTempObject = await this._configuration.loadTempObject();

                if (tempObject.exposureKey !== queryValue) {
                    return;
                }

                if (typeof tempObject.hiddenKey !== 'string'
                    || typeof tempObject.targetDomain !== 'string') {
                    throw new Error('Invalid Temp Object');
                }

                const refreshToken: string = await this.redeemInquiry(tempObject.hiddenKey);

                const authenticationToken: string = await this.refreshToken(refreshToken);

                await this._configuration.persistStorageObject({
                    refreshToken,
                    authenticationToken,
                });
            }
        });
    }
}
