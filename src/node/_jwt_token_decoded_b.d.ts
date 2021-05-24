import { B } from '@ctx-core/object';
import type { auth0_ui_Ctx } from '../auth0_ui_Ctx';
declare const key = "_jwt_token_decoded";
export declare const _jwt_token_decoded_b: B<auth0_ui_Ctx, typeof key>;
export declare type _jwt_token_decoded_T = (jwt_token: string) => Promise<object | string>;
export {};
