import type { auth0_ui_Ctx } from './auth0_ui_Ctx';
import type { jwks_cert__T } from './node/jwks_cert__b';
import type { jwks_x5c__T } from './node/jwks_x5c__b';
import type { jwt_token_decoded__T } from './node/jwt_token_decoded__b';
import type { koa_jwt_token_decoded__T } from './node/koa_jwt_token_decoded__b';
import type { verify_jwt_email__T } from './node/verify_jwt_email__b';
import type { verify_jwt_user_id__T } from './node/verify_jwt_user_id__b';
export interface auth0_ui_ctx_I {
    jwks_cert_?: jwks_cert__T;
    jwks_x5c_?: jwks_x5c__T;
    jwt_token_decoded_?: jwt_token_decoded__T;
    koa_jwt_token_decoded_?: koa_jwt_token_decoded__T;
    verify_jwt_email_?: verify_jwt_email__T;
    verify_jwt_user_id_?: verify_jwt_user_id__T;
    auth0_ui_b_h?: auth0_ui_b_h_T;
}
export interface auth0_ui_b_h_T {
    get jwks_cert_(): jwks_cert__T;
    get jwks_x5c_(): jwks_x5c__T;
    get jwt_token_decoded_(): jwt_token_decoded__T;
    get koa_jwt_token_decoded_(): koa_jwt_token_decoded__T;
    get verify_jwt_email_(): verify_jwt_email__T;
    get verify_jwt_user_id_(): verify_jwt_user_id__T;
}
export declare function auth0_ui_b_h_b(ctx: auth0_ui_Ctx): auth0_ui_b_h_T;
