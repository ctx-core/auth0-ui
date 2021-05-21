import { _jwks_cert_ctx_I } from './_jwks_cert_b';
export interface _jwt_token_decoded_ctx_I extends _jwks_cert_ctx_I {
    _jwt_token_decoded?: _jwt_token_decoded_T;
}
export declare const _jwt_token_decoded_b: import("@ctx-core/object").Be<_jwt_token_decoded_ctx_I, "_jwt_token_decoded">;
export declare type _jwt_token_decoded_T = (jwt_token: string) => Promise<object | string>;
