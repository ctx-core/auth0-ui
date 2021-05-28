import { _b, B } from '@ctx-core/object'
import { throw__response__fetch } from '@ctx-core/fetch'
import { get_jwks_json_b } from '@ctx-core/auth0'
import type { auth0_ui_Ctx } from '../auth0_ui_Ctx'
const key = 'jwks_x5c_fn'
export const jwks_x5c_fn_b:B<auth0_ui_Ctx, typeof key> = _b<auth0_ui_Ctx, typeof key>(key, ctx=>{
	const get_jwks_json = get_jwks_json_b(ctx)
	return jwks_x5c_fn as jwks_x5c_fn_T
	async function jwks_x5c_fn() {
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
export type jwks_x5c_fn_T = ()=>Promise<string>
