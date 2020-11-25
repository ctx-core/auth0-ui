import { _b } from '@ctx-core/object'
import { _user_id } from '@ctx-core/auth0'
import { _koa_jwt_token_decoded_b } from './_koa_jwt_token_decoded_b'
export const _verify_jwt_user_id_b = _b(
	'_verify_jwt_user_id', (ctx)=>{
		const _koa_jwt_token_decoded = _koa_jwt_token_decoded_b(ctx)
		return async function _user_id__jwt__verify(authorization) {
			const decoded__jwt_token = await _koa_jwt_token_decoded(authorization)
			const user_id = _user_id(decoded__jwt_token)
			return user_id
		}
	})
