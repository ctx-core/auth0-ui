import { _jwks_x5c_Ctx } from './_jwks_x5c_b';
export interface _jwks_cert_Ctx extends _jwks_x5c_Ctx {
    _jwks_cert?: _jwks_cert_T;
}
export declare const _jwks_cert_b: import("@ctx-core/object").Be<_jwks_cert_Ctx, "_jwks_cert">;
export declare type _jwks_cert_T = () => Promise<string>;
