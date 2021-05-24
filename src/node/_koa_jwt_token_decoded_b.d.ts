import { B } from '@ctx-core/object';
import type { jwt_token_decoded_I } from '@ctx-core/auth0';
import type { auth0_ui_Ctx } from '../auth0_ui_Ctx';
declare const key = "_koa_jwt_token_decoded";
export declare const _koa_jwt_token_decoded_b: B<auth0_ui_Ctx, typeof key>;
export declare type _koa_jwt_token_decoded_T = (authorization: string | undefined) => Promise<jwt_token_decoded_I>;
export {};
