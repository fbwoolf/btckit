import { ValueOf } from './utils';

import './rpc';
import { DefineGetInfoMethod } from './methods/get-info';
import { DefineSignPsbtMethod } from './methods/sign-psbt';
import { DefineGetAddressesMethod } from './methods/get-addresses';
import { DefineSignMessageMethod } from './methods/sign-message';

export * from './rpc';
export * from './methods/get-info';
export * from './methods/sign-psbt';
export * from './methods/get-addresses';

export type BtcKitMethodMap = DefineGetInfoMethod &
  DefineGetAddressesMethod &
  DefineSignPsbtMethod &
  DefineSignMessageMethod;

export type BtcKitRequests = ValueOf<BtcKitMethodMap>['request'];

export type BtcKitResponses = ValueOf<BtcKitMethodMap>['response'];

export type BtcKitMethodNames = keyof BtcKitMethodMap;

export interface BtcKitRequestFn {
  <T extends BtcKitMethodNames>(arg: T, params?: object | string[]): Promise<
    BtcKitMethodMap[T]['response']
  >;
}

export interface BtcKitListenFn {
  (method: string, callback: () => void): () => void;
}

declare global {
  interface Window {
    /**
     * Object with method used to interact with BtcKit-compatible wallets. See
     * for more info https://btckit.org
     */
    btc?: {
      /**
       * Request method. Takes a method name, and optional parameters
       * @returns Typed response for corresponding method
       */
      request: BtcKitRequestFn;
      /**
       * Listen method. Takes an event name to listen for, and a callback function.
       * @returns An unsubscribe function
       */
      listen: BtcKitListenFn;
    };
  }
}
