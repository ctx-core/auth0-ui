import jwt from 'jsonwebtoken'
import { _b } from '@ctx-core/object'
import { _jwks_cert_b } from './_jwks_cert_b'
export const _jwt_token_decoded_b = _b(
	'_jwt_token_decoded', (ctx)=>{
		const _jwks_cert = _jwks_cert_b(ctx)
		return async function _jwt_token_decoded(jwt_token) {
			const jwks_cert = await _jwks_cert()
			const auth0_token_decoded = jwt.verify(jwt_token, jwks_cert)
			return auth0_token_decoded
		}
	})
