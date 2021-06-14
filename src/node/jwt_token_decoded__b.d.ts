import { B } from '@ctx-core/object';
import type { auth0_ui_Ctx } from '../auth0_ui_Ctx';
declare const key = "jwt_token_decoded_";
export declare const jwt_token_decoded__b: B<auth0_ui_Ctx, typeof key>;
export declare type jwt_token_decoded__T = (jwt_token: string) => Promise<object | string>;
export {};
