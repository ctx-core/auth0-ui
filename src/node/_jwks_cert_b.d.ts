import { _jwks_x5c_ctx_I } from './_jwks_x5c_b';
export interface _jwks_cert_ctx_I extends _jwks_x5c_ctx_I {
    _jwks_cert?: _jwks_cert_T;
}
export declare const _jwks_cert_b: import("@ctx-core/object").Be<_jwks_cert_ctx_I, "_jwks_cert">;
export declare type _jwks_cert_T = () => Promise<string>;
