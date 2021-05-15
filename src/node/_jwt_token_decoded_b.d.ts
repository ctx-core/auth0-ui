import { _jwks_cert_ctx_I } from './_jwks_cert_b';
export declare const _jwt_token_decoded_b: import("@ctx-core/object").Be<(jwt_token: string) => Promise<object | string>, _jwt_token_decoded_ctx_I>;
export interface _jwt_token_decoded_ctx_I extends _jwks_cert_ctx_I {
    _jwt_token_decoded?(jwt_token: string): Promise<object | string>;
}
