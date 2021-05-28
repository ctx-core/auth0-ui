import { _b } from '@ctx-core/object'
import type { B } from '@ctx-core/object'
import type { jwks_cert_fn_T } from './node/jwks_cert_fn_b'
import { jwks_cert_fn_b } from './node/jwks_cert_fn_b'
import type { jwks_x5c_fn_T } from './node/jwks_x5c_fn_b'
import { jwks_x5c_fn_b } from './node/jwks_x5c_fn_b'
import type { jwt_token_decoded_fn_T } from './node/jwt_token_decoded_fn_b'
import { jwt_token_decoded_fn_b } from './node/jwt_token_decoded_fn_b'
import type { koa_jwt_token_decoded_fn_T } from './node/koa_jwt_token_decoded_fn_b'
import { koa_jwt_token_decoded_fn_b } from './node/koa_jwt_token_decoded_fn_b'
import type { verify_jwt_email_fn_T } from './node/verify_jwt_email_fn_b'
import { verify_jwt_email_fn_b } from './node/verify_jwt_email_fn_b'
import type { verify_jwt_user_id_fn_T } from './node/verify_jwt_user_id_fn_b'
import { verify_jwt_user_id_fn_b } from './node/verify_jwt_user_id_fn_b'
export interface auth0_ui_ctx_I {
	jwks_cert_fn?:jwks_cert_fn_T
	jwks_x5c_fn?:jwks_x5c_fn_T
	jwt_token_decoded_fn?:jwt_token_decoded_fn_T
	koa_jwt_token_decoded_fn?:koa_jwt_token_decoded_fn_T
	verify_jwt_email_fn?:verify_jwt_email_fn_T
	verify_jwt_user_id_fn?:verify_jwt_user_id_fn_T
	auth0_ui_b_h?:auth0_ui_b_h_T
}
export interface auth0_ui_b_h_T {
	get jwks_cert_fn():jwks_cert_fn_T
	get jwks_x5c_fn():jwks_x5c_fn_T
	get jwt_token_decoded_fn():jwt_token_decoded_fn_T
	get koa_jwt_token_decoded_fn():koa_jwt_token_decoded_fn_T
	get verify_jwt_email_fn():verify_jwt_email_fn_T
	get verify_jwt_user_id_fn():verify_jwt_user_id_fn_T
}
export function auth0_ui_b_h_b(ctx:auth0_ui_ctx_I):B<auth0_ui_ctx_I, 'auth0_ui_b_h'> {
	return _b('auth0_ui_b_h', ()=>{
		return {
			get jwks_cert_fn() { return jwks_cert_fn_b(ctx) },
			get jwks_x5c_fn() { return jwks_x5c_fn_b(ctx) },
			get jwt_token_decoded_fn() { return jwt_token_decoded_fn_b(ctx) },
			get koa_jwt_token_decoded_fn() { return koa_jwt_token_decoded_fn_b(ctx) },
			get verify_jwt_email_fn() { return verify_jwt_email_fn_b(ctx) },
			get verify_jwt_user_id_fn() { return verify_jwt_user_id_fn_b(ctx) }
		}
	})
}