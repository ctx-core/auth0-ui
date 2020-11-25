import { _b } from '@ctx-core/object'
import { _jwt_token__authorization__header } from '@ctx-core/jwt'
import { error_ctx_type, throw_bad_credentials } from '@ctx-core/error'
import { _jwt_token_decoded_b } from './_jwt_token_decoded_b'
export const _koa_jwt_token_decoded_b = _b(
	'_koa_jwt_token_decoded', (ctx)=>{
		const _jwt_token_decoded = _jwt_token_decoded_b(ctx)
		return function _koa_jwt_token_decoded(authorization) {
			const jwt_token = _jwt_token__authorization__header(authorization)
			if (!jwt_token) {
				throw_bad_credentials({} as error_ctx_type)
			}
			return _jwt_token_decoded(jwt_token)
		}
	})
