import jwt from 'jsonwebtoken'
import { _b, B } from '@ctx-core/object'
import type { auth0_ui_Ctx } from '../auth0_ui_Ctx'
import { jwks_cert_fn_b } from './jwks_cert_fn_b'
const key = 'jwt_token_decoded_fn'
export const jwt_token_decoded_fn_b:B<auth0_ui_Ctx, typeof key> = _b<auth0_ui_Ctx, typeof key>(key, ctx=>{
	const jwks_cert_fn = jwks_cert_fn_b(ctx)
	return jwt_token_decoded_fn as jwt_token_decoded_fn_T
	async function jwt_token_decoded_fn(jwt_token:string):Promise<object|string> {
		const jwks_cert = await jwks_cert_fn()
		const auth0_token_decoded = jwt.verify(jwt_token, jwks_cert)
		return auth0_token_decoded
	}
})
export type jwt_token_decoded_fn_T = (jwt_token:string)=>Promise<object|string>
