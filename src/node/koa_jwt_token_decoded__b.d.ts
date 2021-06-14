import { B } from '@ctx-core/object';
import type { jwt_token_decoded_I } from '@ctx-core/auth0';
import type { auth0_ui_Ctx } from '../auth0_ui_Ctx';
declare const key = "koa_jwt_token_decoded_";
export declare const koa_jwt_token_decoded__b: B<auth0_ui_Ctx, typeof key>;
export declare type koa_jwt_token_decoded__T = (authorization: string | undefined) => Promise<jwt_token_decoded_I>;
export {};
