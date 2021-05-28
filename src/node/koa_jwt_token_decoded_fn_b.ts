import type { nullish } from '@ctx-core/function'
import { _b, B } from '@ctx-core/object'
import { _header_authorization_jwt_token } from '@ctx-core/jwt'
import { error_ctx_I, throw_bad_credentials } from '@ctx-core/error'
import type { jwt_token_decoded_I } from '@ctx-core/auth0'
import type { auth0_ui_Ctx } from '../auth0_ui_Ctx'
import { jwt_token_decoded_fn_b } from './jwt_token_decoded_fn_b'
const key = 'koa_jwt_token_decoded_fn'
export const koa_jwt_token_decoded_fn_b:B<auth0_ui_Ctx, typeof key> = _b<auth0_ui_Ctx, typeof key>(key, ctx=>{
	const jwt_token_decoded_fn = jwt_token_decoded_fn_b(ctx)
	return async function koa_jwt_token_decoded_fn(authorization:string|nullish):Promise<jwt_token_decoded_I> {
		const jwt_token = _header_authorization_jwt_token(authorization)
		if (!jwt_token) {
			throw_bad_credentials({} as error_ctx_I)
		}
		return await jwt_token_decoded_fn(jwt_token!) as jwt_token_decoded_I
	}
})
export type koa_jwt_token_decoded_fn_T = (authorization:string|undefined)=>Promise<jwt_token_decoded_I>
