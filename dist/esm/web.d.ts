import { WebPlugin } from '@capacitor/core';
import type { CapacitorPresentationPlugin, OpenOptions, OpenResponse } from './definitions';
export declare class CapacitorPresentationWeb extends WebPlugin implements CapacitorPresentationPlugin {
    private presentationConnection;
    open(options: OpenOptions): Promise<OpenResponse>;
    sendMessage<T>(message: T): Promise<any>;
    private startDisplay;
    terminate(): Promise<any>;
    getDisplays(): Promise<{
        displays: number;
    }>;
}
