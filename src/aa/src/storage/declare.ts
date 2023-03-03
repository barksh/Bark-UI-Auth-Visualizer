/**
 * @author WMXPY
 * @namespace Storage
 * @description Declare
 */

export interface IBarkStorageAgent {

    persistStorage(objectString: string): Promise<void> | void;
    loadStorage(): Promise<string> | string;

    persistTemp(objectString: string): Promise<void> | void;
    loadTemp(): Promise<string> | string;
}

export type BarkTempObject = {

    readonly targetDomain: string | null;
    readonly overrideTargetModuleHost: string | null;
    readonly exposureKey: string | null;
    readonly hiddenKey: string | null;
};

export type BarkStorageObject = {

    readonly refreshToken: string | null;
    readonly authenticationToken: string | null;
};
