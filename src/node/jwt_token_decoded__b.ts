import jwt from 'jsonwebtoken'
import { _b, B } from '@ctx-core/object'
import type { auth0_ui_Ctx } from '../auth0_ui_Ctx'
import { jwks_cert__b } from './jwks_cert__b'
const key = 'jwt_token_decoded_'
export const jwt_token_decoded__b:B<auth0_ui_Ctx, typeof key> = _b(key, ctx=>{
	const jwks_cert_ = jwks_cert__b(ctx)
	return jwt_token_decoded_ as jwt_token_decoded__T
	async function jwt_token_decoded_(jwt_token:string):Promise<object|string> {
		const jwks_cert = await jwks_cert_()
		const auth0_token_decoded = jwt.verify(jwt_token, jwks_cert)
		return auth0_token_decoded
	}
})
export type jwt_token_decoded__T = (jwt_token:string)=>Promise<object|string>
