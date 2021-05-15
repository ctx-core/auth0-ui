import type { nullish } from '@ctx-core/function';
import type { jwt_token_decoded_I } from '@ctx-core/auth0';
import { _jwt_token_decoded_ctx_I } from './_jwt_token_decoded_b';
export declare const _koa_jwt_token_decoded_b: import("@ctx-core/object").Be<(authorization: string | nullish) => Promise<jwt_token_decoded_I>, _koa_jwt_token_decoded_ctx_I>;
export interface _koa_jwt_token_decoded_ctx_I extends _jwt_token_decoded_ctx_I {
    _koa_jwt_token_decoded?: _koa_jwt_token_decoded_T;
}
export declare type _koa_jwt_token_decoded_T = (authorization: string) => Promise<jwt_token_decoded_I>;
