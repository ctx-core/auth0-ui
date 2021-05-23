import type { auth0_Ctx } from '@ctx-core/auth0';
import type { _jwks_x5c_T } from './node';
import type { _jwks_cert_T } from './node';
import type { _jwt_token_decoded_T } from './node';
import type { _koa_jwt_token_decoded_T } from './node';
import type { _verify_jwt_email_T } from './node';
import type { _verify_jwt_user_id_T } from './node';
export interface auth0_ui_Ctx extends auth0_Ctx {
    _jwt_token_decoded?: _jwt_token_decoded_T;
    _jwks_cert?: _jwks_cert_T;
    _jwks_x5c?: _jwks_x5c_T;
    _koa_jwt_token_decoded?: _koa_jwt_token_decoded_T;
    _verify_jwt_email?: _verify_jwt_email_T;
    _verify_jwt_user_id?: _verify_jwt_user_id_T;
}
