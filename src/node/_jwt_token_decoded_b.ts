import jwt from 'jsonwebtoken'
import { _b } from '@ctx-core/object'
import type { auth0_ui_Ctx } from '../auth0_ui_Ctx'
import { _jwks_cert_b } from './_jwks_cert_b'
const key = '_jwt_token_decoded'
export const _jwt_token_decoded_b = _b<auth0_ui_Ctx, typeof key>(key, ctx=>{
	const _jwks_cert = _jwks_cert_b(ctx)
	return _jwt_token_decoded as _jwt_token_decoded_T
	async function _jwt_token_decoded(jwt_token:string):Promise<object|string> {
		const jwks_cert = await _jwks_cert()
		const auth0_token_decoded = jwt.verify(jwt_token, jwks_cert)
		return auth0_token_decoded
	}
})
export type _jwt_token_decoded_T = (jwt_token:string)=>Promise<object|string>
