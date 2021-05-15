import { _b } from '@ctx-core/object'
import { throw__response__fetch } from '@ctx-core/fetch'
import { get_jwks_json_b, get_jwks_json_ctx_I } from '@ctx-core/auth0'
export const _jwks_x5c_b = _b('_jwks_x5c', (
	ctx:_jwks_x5c_ctx_I
)=>{
	const get_jwks_json = get_jwks_json_b(ctx)
	return _jwks_x5c as _jwks_x5c_T
	async function _jwks_x5c() {
		const response = await get_jwks_json()
		if (!response.ok) {
			await throw__response__fetch(response)
		}
		const jwks_json = await response.json()
		const { keys } = jwks_json
		const key = keys[0]
		const { x5c } = key
		return x5c
	}
})
export interface _jwks_x5c_ctx_I extends get_jwks_json_ctx_I {
	_jwks_x5c?:_jwks_x5c_T
}
export type _jwks_x5c_T = ()=>Promise<string>
