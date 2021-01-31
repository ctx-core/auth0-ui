import { _b } from '@ctx-core/object'
import { _user_id, validate_auth0_user } from '@ctx-core/auth0'
import { get_auth0_v2_user_b } from '@ctx-core/auth0-management'
import { _koa_jwt_token_decoded_b } from './_koa_jwt_token_decoded_b'
export const _verify_jwt_email_b = _b(
	'_verify_jwt_email', (ctx)=>{
		const get_auth0_v2_user = get_auth0_v2_user_b(ctx)
		const _koa_jwt_token_decoded = _koa_jwt_token_decoded_b(ctx)
		return async function _verify_jwt_email(authorization) {
			const jwt_token_decoded = await _koa_jwt_token_decoded(authorization)
			let email = jwt_token_decoded.email
			if (!email) {
				const user_id = _user_id(jwt_token_decoded)
				const AUTH0_DOMAIN = process.env.AUTH0_DOMAIN as string
				const request_ctx = {
					AUTH0_DOMAIN,
					user_id
				}
				const response = await get_auth0_v2_user(request_ctx)
				const user = await response.json()
				validate_auth0_user(user)
				email = user.email
			}
			return email
		}
	})
