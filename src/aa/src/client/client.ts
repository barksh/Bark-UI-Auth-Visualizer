/**
 * @author WMXPY
 * @namespace Client
 * @description Client
 */

import { BarkModelConfiguration } from "../model/configuration";
import { BarkPopupWindowModel } from "../model/popup-window-model";
import { BarkQueryRegistererRegisterer } from "../model/query-registerer";
import { IBarkStorageAgent } from "../storage/declare";

export class BarkAuthenticationClient {

    public static create(selfDomain: string): BarkAuthenticationClient {

        return new BarkAuthenticationClient(selfDomain);
    }

    private readonly _configuration: BarkModelConfiguration;

    private constructor(selfDomain: string) {

        this._configuration = BarkModelConfiguration.create(selfDomain);
    }

    public setStorageAgent(storageAgent: IBarkStorageAgent): this {

        this._configuration.setStorageAgent(storageAgent);
        return this;
    }

    public createPopupWindowModel(targetDomain: string): BarkPopupWindowModel {

        return BarkPopupWindowModel.fromConfiguration(
            targetDomain,
            this._configuration,
        );
    }

    public createQueryRegisterer(queryKey: string): BarkQueryRegistererRegisterer {

        return BarkQueryRegistererRegisterer.create(
            queryKey,
            this._configuration,
        );
    }
}
