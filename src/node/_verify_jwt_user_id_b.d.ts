import { _koa_jwt_token_decoded_Ctx } from './_koa_jwt_token_decoded_b';
export interface _verify_jwt_user_id_Ctx extends _koa_jwt_token_decoded_Ctx {
    _verify_jwt_user_id?: _verify_jwt_user_id_T;
}
export declare const _verify_jwt_user_id_b: import("@ctx-core/object").Be<_verify_jwt_user_id_Ctx, "_verify_jwt_user_id", _verify_jwt_user_id_T>;
export declare type _verify_jwt_user_id_T = (authorization: string) => Promise<string>;
