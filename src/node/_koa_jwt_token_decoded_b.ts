import type { nullish } from '@ctx-core/function'
import { _b } from '@ctx-core/object'
import { _header_authorization_jwt_token } from '@ctx-core/jwt'
import { error_ctx_I, throw_bad_credentials } from '@ctx-core/error'
import type { jwt_token_decoded_I } from '@ctx-core/auth0'
import { _jwt_token_decoded_b, _jwt_token_decoded_ctx_I } from './_jwt_token_decoded_b'
export const _koa_jwt_token_decoded_b = _b('_koa_jwt_token_decoded', (
	ctx:_koa_jwt_token_decoded_ctx_I
)=>{
	const _jwt_token_decoded = _jwt_token_decoded_b(ctx)
	return async function _koa_jwt_token_decoded(authorization:string|nullish):Promise<jwt_token_decoded_I> {
		const jwt_token = _header_authorization_jwt_token(authorization)
		if (!jwt_token) {
			throw_bad_credentials({} as error_ctx_I)
		}
		return await _jwt_token_decoded(jwt_token!) as jwt_token_decoded_I
	}
})
export interface _koa_jwt_token_decoded_ctx_I extends _jwt_token_decoded_ctx_I {
	_koa_jwt_token_decoded?:_koa_jwt_token_decoded_T
}
export type _koa_jwt_token_decoded_T = (authorization:string)=>Promise<jwt_token_decoded_I>
