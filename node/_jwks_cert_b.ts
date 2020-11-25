import { _b } from '@ctx-core/object'
import { _jwks_x5c_b } from './_jwks_x5c_b'
export const _jwks_cert_b = _b(
	'_jwks_cert', (ctx)=>{
		const _jwks_x5c = _jwks_x5c_b(ctx)
		return async function _jwks_cert() {
			const jwks_x5c = await _jwks_x5c()
			const in_jwks_cert = jwks_x5c[0]
			const jwks_cert =
				['-----BEGIN CERTIFICATE-----',
					in_jwks_cert,
					'-----END CERTIFICATE-----'
				].join('\n')
			return jwks_cert
		}
	})
