import type { nullish } from '@ctx-core/function'
import { be_, B } from '@ctx-core/object'
import { header_authorization_jwt_token_ } from '@ctx-core/jwt'
import { error_ctx_I, throw_bad_credentials } from '@ctx-core/error'
import type { jwt_token_decoded_I } from '@ctx-core/auth0'
import type { auth0_ui_Ctx } from '../auth0_ui_Ctx'
import { jwt_token_decoded__b } from './jwt_token_decoded__b'
const key = 'koa_jwt_token_decoded_'
export const koa_jwt_token_decoded__b:B<auth0_ui_Ctx, typeof key> = be_(key, ctx=>{
	const jwt_token_decoded_ = jwt_token_decoded__b(ctx)
	return async function koa_jwt_token_decoded_(authorization:string|nullish):Promise<jwt_token_decoded_I> {
		const jwt_token = header_authorization_jwt_token_(authorization)
		if (!jwt_token) {
			throw_bad_credentials({} as error_ctx_I)
		}
		return await jwt_token_decoded_(jwt_token!) as jwt_token_decoded_I
	}
})
export type koa_jwt_token_decoded__T = (authorization:string|undefined)=>Promise<jwt_token_decoded_I>
