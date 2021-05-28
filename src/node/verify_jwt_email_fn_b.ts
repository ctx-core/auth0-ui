import { _b, B } from '@ctx-core/object'
import { user_id_fn, validate_auth0_user } from '@ctx-core/auth0'
import { get_auth0_v2_user_b} from '@ctx-core/auth0-management'
import type { auth0_ui_Ctx } from '../auth0_ui_Ctx'
import { koa_jwt_token_decoded_fn_b} from './koa_jwt_token_decoded_fn_b'
const key = 'verify_jwt_email_fn'
export const verify_jwt_email_fn_b:B<auth0_ui_Ctx, typeof key> = _b<auth0_ui_Ctx, typeof key>(key, ctx=>{
	const get_auth0_v2_user = get_auth0_v2_user_b(ctx)
	const koa_jwt_token_decoded_fn = koa_jwt_token_decoded_fn_b(ctx)
	return verify_jwt_email_fn as verify_jwt_email_fn_T
	async function verify_jwt_email_fn(authorization:string) {
		const koajwt_token_decoded_fn = await koa_jwt_token_decoded_fn(authorization)
		let email = koajwt_token_decoded_fn.email
		if (!email) {
			const user_id = user_id_fn(koajwt_token_decoded_fn)
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
export type verify_jwt_email_fn_T = (authorization:string)=>Promise<string>
