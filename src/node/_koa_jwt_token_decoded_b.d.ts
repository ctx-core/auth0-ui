import type { jwt_token_decoded_I } from '@ctx-core/auth0';
import { _jwt_token_decoded_ctx_I } from './_jwt_token_decoded_b';
export interface _koa_jwt_token_decoded_ctx_I extends _jwt_token_decoded_ctx_I {
    _koa_jwt_token_decoded?: _koa_jwt_token_decoded_T;
}
export declare const _koa_jwt_token_decoded_b: import("@ctx-core/object").Be<_koa_jwt_token_decoded_ctx_I, "_koa_jwt_token_decoded">;
export declare type _koa_jwt_token_decoded_T = (authorization: string | undefined) => Promise<jwt_token_decoded_I>;
