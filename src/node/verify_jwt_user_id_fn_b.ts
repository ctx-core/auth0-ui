import { _b, B } from '@ctx-core/object'
import { user_id_fn } from '@ctx-core/auth0'
import type { auth0_ui_Ctx } from '../auth0_ui_Ctx'
import { koa_jwt_token_decoded_fn_b} from './koa_jwt_token_decoded_fn_b'
const key = 'verify_jwt_user_id_fn'
export const verify_jwt_user_id_fn_b:B<auth0_ui_Ctx, typeof key> = _b<auth0_ui_Ctx, typeof key>(key, ctx=>{
	const koa_jwt_token_decoded_fn = koa_jwt_token_decoded_fn_b(ctx)
	return verify_jwt_user_id_fn as verify_jwt_user_id_fn_T
	async function verify_jwt_user_id_fn(authorization:string) {
		const jwt_token_decoded = await koa_jwt_token_decoded_fn(authorization)
		const user_id = user_id_fn(jwt_token_decoded)
		return user_id
	}
})
export type verify_jwt_user_id_fn_T = (authorization:string)=>Promise<string>
