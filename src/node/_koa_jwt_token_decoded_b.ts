import type { nullish } from '@ctx-core/function'
import { _b } from '@ctx-core/object'
import { _header_authorization_jwt_token } from '@ctx-core/jwt'
import { error_Ctx, throw_bad_credentials } from '@ctx-core/error'
import type { jwt_token_decoded_I } from '@ctx-core/auth0'
import type { auth0_ui_Ctx } from '../auth0_ui_Ctx'
import { _jwt_token_decoded_b } from './_jwt_token_decoded_b'
const key = '_koa_jwt_token_decoded'
export const _koa_jwt_token_decoded_b = _b<auth0_ui_Ctx, typeof key>(key, ctx=>{
	const _jwt_token_decoded = _jwt_token_decoded_b(ctx)
	return async function _koa_jwt_token_decoded(authorization:string|nullish):Promise<jwt_token_decoded_I> {
		const jwt_token = _header_authorization_jwt_token(authorization)
		if (!jwt_token) {
			throw_bad_credentials({} as error_Ctx)
		}
		return await _jwt_token_decoded(jwt_token!) as jwt_token_decoded_I
	}
})
export type _koa_jwt_token_decoded_T = (authorization:string|undefined)=>Promise<jwt_token_decoded_I>
