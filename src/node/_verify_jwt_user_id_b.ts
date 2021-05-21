import { _b } from '@ctx-core/object'
import { _user_id } from '@ctx-core/auth0'
import { _koa_jwt_token_decoded_b, _koa_jwt_token_decoded_ctx_I } from './_koa_jwt_token_decoded_b'
const key = '_verify_jwt_user_id'
export interface _verify_jwt_user_id_ctx_I extends _koa_jwt_token_decoded_ctx_I {
	_verify_jwt_user_id?:_verify_jwt_user_id_T
}
export const _verify_jwt_user_id_b = _b<_verify_jwt_user_id_ctx_I, typeof key>(key, ctx=>{
	const _koa_jwt_token_decoded = _koa_jwt_token_decoded_b(ctx)
	return _verify_jwt_user_id as _verify_jwt_user_id_T
	async function _verify_jwt_user_id(authorization:string) {
		const jwt_token_decoded = await _koa_jwt_token_decoded(authorization)
		const user_id = _user_id(jwt_token_decoded)
		return user_id
	}
})
export type _verify_jwt_user_id_T = (authorization:string)=>Promise<string>
