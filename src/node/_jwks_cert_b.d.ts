import { _jwks_x5c_ctx_I } from './_jwks_x5c_b';
export declare const _jwks_cert_b: import("@ctx-core/object").Be<_jwks_cert_T, _jwks_cert_ctx_I>;
export interface _jwks_cert_ctx_I extends _jwks_x5c_ctx_I {
    _jwks_cert?: _jwks_cert_T;
}
export declare type _jwks_cert_T = () => Promise<string>;
