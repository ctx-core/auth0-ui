import jwt from 'jsonwebtoken'
import { get__user__v2__auth0 } from '@ctx-core/auth0-management/fetch'
import { get__jwks__json } from '@ctx-core/auth0/fetch'
import { validate__user, _user_id } from '@ctx-core/auth0'
import { throw__response__fetch } from '@ctx-core/fetch'
import { _jwt_token__authorization__header } from '@ctx-core/jwt'
import { error_ctx_type, throw_bad_credentials } from '@ctx-core/error'
export async function _email__jwt__verify(authorization) {
	const decoded__jwt_token = await _decoded__jwt_token__koa(authorization)
	let email = decoded__jwt_token.email
	if (!email) {
		const user_id = _user_id(decoded__jwt_token)
		const AUTH0_DOMAIN = process.env.AUTH0_DOMAIN
		const ctx__request = {
			AUTH0_DOMAIN,
			user_id
		}
		const response = await get__user__v2__auth0(ctx__request)
		const user = await response.json()
		validate__user(user)
		email = user.email
	}
	return email
}
export async function _user_id__jwt__verify(authorization) {
	const decoded__jwt_token = await _decoded__jwt_token__koa(authorization)
	const user_id = _user_id(decoded__jwt_token)
	return user_id
}
export function _decoded__jwt_token__koa(authorization) {
	const jwt_token = _jwt_token__authorization__header(authorization)
	if (!jwt_token) {
		throw_bad_credentials({} as error_ctx_type)
	}
	return _decoded__jwt_token(jwt_token)
}
export async function _decoded__jwt_token(jwt_token) {
	const cert__jwks = await _cert__jwks()
	const decoded__token__auth0 = jwt.verify(jwt_token, cert__jwks)
	return decoded__token__auth0
}
export async function _cert__jwks() {
	const x5c__jwks = await _x5c__jwks()
	const cert__jwks__ = x5c__jwks[0]
	const cert__jwks =
		['-----BEGIN CERTIFICATE-----',
			cert__jwks__,
			'-----END CERTIFICATE-----'
		].join('\n')
	return cert__jwks
}
export async function _x5c__jwks() {
	const response = await get__jwks__json()
	if (!response.ok) {
		throw__response__fetch(response)
	}
	const jwks__json = await response.json()
	const { keys } = jwks__json
	const key = keys[0]
	const { x5c } = key
	return x5c
}
