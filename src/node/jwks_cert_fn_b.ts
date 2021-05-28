import { _b, B } from '@ctx-core/object'
import { jwks_x5c_fn_b } from './jwks_x5c_fn_b'
import type { auth0_ui_Ctx } from '../auth0_ui_Ctx'
const key = 'jwks_cert_fn'
export const jwks_cert_fn_b:B<auth0_ui_Ctx, typeof key> = _b<auth0_ui_Ctx, typeof key>(key, ctx=>{
	const jwks_x5c_fn = jwks_x5c_fn_b(ctx)
	return jwks_cert_fn as jwks_cert_fn_T
	async function jwks_cert_fn() {
		const jwks_x5c = await jwks_x5c_fn()
		const injwks_cert_fn = jwks_x5c[0]
		const jwks_cert =
			['-----BEGIN CERTIFICATE-----',
				injwks_cert_fn,
				'-----END CERTIFICATE-----'
			].join('\n')
		return jwks_cert
	}
})
export type jwks_cert_fn_T = ()=>Promise<string>
