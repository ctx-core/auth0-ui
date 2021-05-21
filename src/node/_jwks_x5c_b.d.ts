import { get_jwks_json_ctx_I } from '@ctx-core/auth0';
export interface _jwks_x5c_ctx_I extends get_jwks_json_ctx_I {
    _jwks_x5c?: _jwks_x5c_T;
}
export declare const _jwks_x5c_b: import("@ctx-core/object").Be<_jwks_x5c_ctx_I, "_jwks_x5c">;
export declare type _jwks_x5c_T = () => Promise<string>;
