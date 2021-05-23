import { _b } from '@ctx-core/object'
import { _user_id } from '@ctx-core/auth0'
import type { auth0_ui_Ctx } from '../auth0_ui_Ctx'
import { _koa_jwt_token_decoded_b} from './_koa_jwt_token_decoded_b'
const key = '_verify_jwt_user_id'
export const _verify_jwt_user_id_b = _b<auth0_ui_Ctx, typeof key>(key, ctx=>{
	const _koa_jwt_token_decoded = _koa_jwt_token_decoded_b(ctx)
	return _verify_jwt_user_id as _verify_jwt_user_id_T
	async function _verify_jwt_user_id(authorization:string) {
		const jwt_token_decoded = await _koa_jwt_token_decoded(authorization)
		const user_id = _user_id(jwt_token_decoded)
		return user_id
	}
})
export type _verify_jwt_user_id_T = (authorization:string)=>Promise<string>
