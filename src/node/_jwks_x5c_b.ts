import { _b } from '@ctx-core/object'
import { throw__response__fetch } from '@ctx-core/fetch'
import { get_jwks_json_b } from '@ctx-core/auth0'
import type { auth0_ui_Ctx } from '../auth0_ui_Ctx'
const key = '_jwks_x5c'
export const _jwks_x5c_b = _b<auth0_ui_Ctx, typeof key>(key, ctx=>{
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
export type _jwks_x5c_T = ()=>Promise<string>
