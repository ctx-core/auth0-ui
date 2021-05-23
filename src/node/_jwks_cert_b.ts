import { _b } from '@ctx-core/object'
import { _jwks_x5c_b } from './_jwks_x5c_b'
import type { auth0_ui_Ctx } from '../auth0_ui_Ctx'
const key = '_jwks_cert'
export const _jwks_cert_b = _b<auth0_ui_Ctx, typeof key>(key, ctx=>{
	const _jwks_x5c = _jwks_x5c_b(ctx)
	return _jwks_cert as _jwks_cert_T
	async function _jwks_cert() {
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
export type _jwks_cert_T = ()=>Promise<string>
