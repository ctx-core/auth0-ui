import { _koa_jwt_token_decoded_ctx_I } from './_koa_jwt_token_decoded_b';
export declare const _verify_jwt_user_id_b: import("@ctx-core/object").Be<_verify_jwt_user_id_T, _verify_jwt_user_id_ctx_I>;
export interface _verify_jwt_user_id_ctx_I extends _koa_jwt_token_decoded_ctx_I {
    _verify_jwt_user_id?: _verify_jwt_user_id_T;
}
export declare type _verify_jwt_user_id_T = (authorization: string) => Promise<string>;
