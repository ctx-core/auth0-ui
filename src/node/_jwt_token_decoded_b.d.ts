import { _jwks_cert_Ctx } from './_jwks_cert_b';
export interface _jwt_token_decoded_Ctx extends _jwks_cert_Ctx {
    _jwt_token_decoded?: _jwt_token_decoded_T;
}
export declare const _jwt_token_decoded_b: import("@ctx-core/object").Be<_jwt_token_decoded_Ctx, "_jwt_token_decoded">;
export declare type _jwt_token_decoded_T = (jwt_token: string) => Promise<object | string>;
