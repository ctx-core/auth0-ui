import { _user_id, validate_auth0_user } from '@ctx-core/auth0'
import {
	get_auth0_v2_user_b, get_auth0_v2_users_by_email_b, patch_auth0_v2_user_b,
} from '@ctx-core/auth0-management'
import { _koa_jwt_token_decoded_b } from './node'
import type { Auth0UserProfile } from 'auth0-js'
export async function post_auth0_change_password(req, res) {
	const ctx = {}
	const patch_auth0_v2_user = patch_auth0_v2_user_b(ctx)
	const get_auth0_v2_user = get_auth0_v2_user_b(ctx)
	const _koa_jwt_token_decoded = _koa_jwt_token_decoded_b(ctx)
	const get_auth0_v2_users_by_email = get_auth0_v2_users_by_email_b(ctx)
	const AUTH0_DOMAIN = process.env.AUTH0_DOMAIN
	const password_user = await _password_user()
	const { user_id } = password_user
	if (!password_user) {
		validate_auth0_user(null)
		return
	}
	const { body } = req
	const { password } = body
	const response = await patch_auth0_v2_user(user_id, { password })
	const user:Auth0UserProfile = await response.json()
	validate_auth0_user(user)
	res.end(JSON.stringify({ status: 200 }))
	async function _password_user() {
		const jwt_token_decoded = await _koa_jwt_token_decoded(req.headers['authorization'])
		const user_id = _user_id(jwt_token_decoded)
		const response__user = await get_auth0_v2_user({ AUTH0_DOMAIN, user_id })
		const user__request = await response__user.json()
		const { email } = user__request
		if (!email) return
		if (is_username_password_authentication(user__request)) {
			return user__request
		}
		const response__users_by_email =
			await get_auth0_v2_users_by_email({ AUTH0_DOMAIN, email })
		const users = await response__users_by_email.json()
		for (let i = 0; i < users.length; i++) {
			const user = users[i]
			if (is_username_password_authentication(user)) return user
		}
	}
	function is_username_password_authentication(user) {
		return user.identities[0].connection == 'Username-Password-Authentication'
	}
}
export {
	post_auth0_change_password as post__change_password__auth0
}
