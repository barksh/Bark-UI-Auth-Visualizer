/**
 * @author WMXPY
 * @namespace Storage
 * @description Local Storage
 */

import { IBarkStorageAgent } from "./declare";
import { encodeBarkStorageObject, encodeBarkTempObject } from "./encoding";

const localStorageKey: string = '_bark-client-browser-storage';
const localTempKey: string = '_bark-client-browser-temp';

export class BarkLocalStorageAgent implements IBarkStorageAgent {

    public static create(): BarkLocalStorageAgent {
        return new BarkLocalStorageAgent();
    }

    private constructor() {
        // do nothing
    }

    public async persistStorage(objectString: string): Promise<void> {

        localStorage.setItem(localStorageKey, objectString);
    }

    public async loadStorage(): Promise<string> {

        const object: string | null = localStorage.getItem(localStorageKey);

        if (!object) {
            return encodeBarkStorageObject({
                refreshToken: null,
                authenticationToken: null,
            });
        }

        return object;
    }

    public async persistTemp(objectString: string): Promise<void> {

        localStorage.setItem(localTempKey, objectString);
    }

    public async loadTemp(): Promise<string> {

        const object: string | null = localStorage.getItem(localTempKey);

        if (!object) {
            return encodeBarkTempObject({
                exposureKey: null,
                hiddenKey: null,
            });
        }

        return object;
    }
}
