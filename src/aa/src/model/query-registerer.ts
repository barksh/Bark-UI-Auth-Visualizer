/**
 * @author WMXPY
 * @namespace Model
 * @description Query Registerer
 */

import { BarkStorageObject, BarkTempObject } from "../storage/declare";
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

                if (tempObject.exposureKey === queryValue) {


                    const refreshToken: string = await this.redeemInquiry(this._hiddenKey);

                    const authenticationToken: string = await this.refreshToken(refreshToken);

                    const storageObject: BarkStorageObject = await this._configuration.loadStorageObject();
                    storageObject.exposureKey = queryValue;
                    await this._configuration.persistStorageObject(storageObject);
                }
            }
        });
    }
}
