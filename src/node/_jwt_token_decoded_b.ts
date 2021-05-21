import jwt from 'jsonwebtoken'
import { _b } from '@ctx-core/object'
import { _jwks_cert_b, _jwks_cert_Ctx } from './_jwks_cert_b'
const key = '_jwt_token_decoded'
export interface _jwt_token_decoded_Ctx extends _jwks_cert_Ctx {
	_jwt_token_decoded?:_jwt_token_decoded_T
}
export const _jwt_token_decoded_b = _b<_jwt_token_decoded_Ctx, typeof key>(key, ctx=>{
	const _jwks_cert = _jwks_cert_b(ctx)
	return _jwt_token_decoded as _jwt_token_decoded_T
	async function _jwt_token_decoded(jwt_token:string):Promise<object|string> {
		const jwks_cert = await _jwks_cert()
		const auth0_token_decoded = jwt.verify(jwt_token, jwks_cert)
		return auth0_token_decoded
	}
})
export type _jwt_token_decoded_T = (jwt_token:string)=>Promise<object|string>
