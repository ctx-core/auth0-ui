import { get_auth0_v2_user_ctx_I } from '@ctx-core/auth0-management';
import { _koa_jwt_token_decoded_ctx_I } from './_koa_jwt_token_decoded_b';
export interface _verify_jwt_email_ctx_I extends get_auth0_v2_user_ctx_I, _koa_jwt_token_decoded_ctx_I {
    _verify_jwt_email?: _verify_jwt_email_T;
}
export declare const _verify_jwt_email_b: import("@ctx-core/object").Be<_verify_jwt_email_ctx_I, "_verify_jwt_email">;
export declare type _verify_jwt_email_T = (authorization: string) => Promise<string>;
