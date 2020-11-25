import { onDestroy } from 'svelte'
import { has__dom, __dom } from '@ctx-core/dom'
import { get, subscribe } from '@ctx-core/store'
import {
	$auth0_token_error_type, auth0_token_error_b, auth0_token_json_b, post_auth0_oauth_token_b,
	$auth0_token_json_type, _password_realm_body_b, close_auth0_b, logout_auth0_token_error_b,
	post_auth0_dbconnections_signup_b, post_auth0_auth_change_password_b, open_auth0_login_b,
	validate_auth0_signup, clear_auth0_token_error_b, auth0_opened_class_b, $auth0_opened_class_type,
	validate_auth0_forgot_password, post_auth0_passwordless_start_b, _auth0_body_b,
	open_auth0_forgot_password_check_email_b, validate_auth0_change_password,
} from '@ctx-core/auth0'
export class Auth0_c {
	readonly _auth0_body = _auth0_body_b(this.ctx)
	readonly _password_realm_body = _password_realm_body_b(this.ctx)
	readonly auth0_opened_class = auth0_opened_class_b(this.ctx)//region
	get $auth0_opened_class() { return get(this.auth0_opened_class) as $auth0_opened_class_type }//endregion
	readonly auth0_token_json = auth0_token_json_b(this.ctx)//region
	get $auth0_token_json() { return get(this.auth0_token_json) as $auth0_token_json_type }
	set $auth0_token_json(val) { this.auth0_token_json.set(val) }//endregion
	readonly auth0_token_error = auth0_token_error_b(this.ctx)//region
	get $auth0_token_error() { return get(this.auth0_token_error) as $auth0_token_error_type }
	set $auth0_token_error(val) { this.auth0_token_error.set(val) }//endregion
	readonly clear_auth0_token_error = clear_auth0_token_error_b(this.ctx)
	readonly close_auth0 = close_auth0_b(this.ctx)
	readonly logout_auth0_token_error = logout_auth0_token_error_b(this.ctx)
	readonly open_auth0_login = open_auth0_login_b(this.ctx)
	readonly open_auth0_forgot_password_check_email = open_auth0_forgot_password_check_email_b(this.ctx)
	readonly post_auth0_dbconnections_signup = post_auth0_dbconnections_signup_b(this.ctx)
	readonly post_auth0_oauth_token = post_auth0_oauth_token_b(this.ctx)
	readonly post_auth0_auth_change_password = post_auth0_auth_change_password_b(this.ctx)
	readonly post_auth0_passwordless_start = post_auth0_passwordless_start_b(this.ctx)
	constructor(protected ctx:object) {}
	onMount = async (root)=>{
		if (has__dom) {
			const unsubscribe =
				subscribe(this.auth0_opened_class, ()=>this.schedule_forms_clear(root))
			onDestroy(unsubscribe)
		}
	}
	login = async (form, schedule_forms_clear = ()=>{})=>{
		const response =
			await this.post_auth0_oauth_token(
				{ ...this._password_realm_body(form) })
		if (response.ok) {
			const $auth0_token_json = await response.text()
			this.$auth0_token_json = $auth0_token_json
			schedule_forms_clear()
			this.close_auth0()
		} else {
			const $auth_token_error = await response.json()
			this.$auth0_token_error = $auth_token_error
			this.logout_auth0_token_error($auth_token_error)
		}
	}
	signup = async (form, schedule_forms_clear = ()=>{})=>{
		const response =
			await this.post_auth0_dbconnections_signup(this._password_realm_body(form))
		const auth0_userinfo = await response.json()
		const { statusCode } = auth0_userinfo
		if (statusCode) {
			const {
				code,
				description
			} = auth0_userinfo
			const email =
				code === 'user_exists'
				? 'This Email is already signed up'
				: description
			const error__token__auth0 = { email }
			this.logout_auth0_token_error(error__token__auth0)
			return
		}
		schedule_forms_clear()
		await this.login({
			username: form.email,
			password: form.password
		}, schedule_forms_clear)
	}
	change_password = async (form, schedule_forms_clear = ()=>{})=>{
		const { password } = form
		let error
		try {
			const response = await this.post_auth0_auth_change_password(password)
			const response_json = await response.json()
			if (!response.ok) {
				if (response.status == 401) {
					this.open_auth0_login()
					const auth0_token_error = { email: 'Authentication Error - Log in' }
					this.logout_auth0_token_error(auth0_token_error)
					return
				}
				error = response_json.error || 'Error changing Password'
			}
		} catch (e) {
			console.warn(e)
			error = e.message
		}
		if (error) {
			const error__token__auth0 = { password: error }
			this.logout_auth0_token_error(error__token__auth0)
			return
		}
		schedule_forms_clear()
		this.close_auth0()
	}
	_schedule_forms_clear = (root:HTMLElement)=>{
		return ()=>this.schedule_forms_clear(root)
	}
	schedule_forms_clear = (root:HTMLElement)=>{
		setTimeout(()=>{
			this.clear_auth0_token_error()
			clear_inputs(__dom('input[type=text]', root))
			clear_inputs(__dom('input[type=password]', root))
		}, 100)
	}
	onsubmit_signup = async (event:Event, ctx:onsubmit_signup_ctx_I, schedule_forms_clear = ()=>{})=>{
		event.preventDefault()
		const {
			email_input,
			password_input,
			password_confirmation_input,
		} = ctx
		const email = email_input.value
		const password = password_input.value
		const password_confirmation = password_confirmation_input.value
		const auth0_token_error =
			validate_auth0_signup({
				email,
				password,
				password_confirmation
			})
		if (auth0_token_error) {
			this.logout_auth0_token_error(auth0_token_error)
			return false
		}
		await this.signup({
			email,
			password
		}, schedule_forms_clear)
	}
	onsubmit_login = async (event:Event, ctx:onsubmit_login_ctx_I, schedule_forms_clear = ()=>{})=>{
		event.preventDefault()
		const { username_login_input, password_login_input } = ctx
		const username = username_login_input.value
		const password = password_login_input.value
		await this.login({ username, password }, schedule_forms_clear)
	}
	onsubmit_forgot_password = async (event:Event, ctx:onsubmit_forgot_password_ctx_I)=>{
		event.preventDefault()
		const { email_input } = ctx
		const email = email_input.value
		const form =
			{
				connection: 'email',
				send: 'link',
				email
			}
		const error__token__auth0 = validate_auth0_forgot_password(form)
		if (error__token__auth0) {
			this.logout_auth0_token_error(error__token__auth0)
			return
		}
		await this.post_auth0_passwordless_start(this._auth0_body(form))
		this.open_auth0_forgot_password_check_email()
	}
	onsubmit_change_password = async (
		event:Event, ctx:onsubmit_change_password_ctx_I, schedule_forms_clear = ()=>{}
	)=>{
		event.preventDefault()
		const {
			password_input,
			password_confirmation_input,
		} = ctx
		const password = password_input.value
		const password_confirmation = password_confirmation_input.value
		const auth0_token_error =
			validate_auth0_change_password(
				{
					password,
					password_confirmation
				})
		if (auth0_token_error) {
			this.logout_auth0_token_error(auth0_token_error)
			throw auth0_token_error
		}
		return await this.change_password({ password }, schedule_forms_clear)
	}
	onclose = async (event:MouseEvent)=>{
		event.preventDefault()
		this.close_auth0()
	}
}
function clear_inputs(inputs) {
	for (let i = 0; i < inputs.length; i++) {
		const input = inputs[i]
		input.value = ''
	}
}
export interface onsubmit_change_password_ctx_I {
	password_input:HTMLInputElement
	password_confirmation_input:HTMLInputElement
}
export interface onsubmit_forgot_password_ctx_I {
	email_input:HTMLInputElement
}
export interface onsubmit_login_ctx_I {
	username_login_input:HTMLInputElement
	password_login_input:HTMLInputElement
}
export interface onsubmit_signup_ctx_I {
	email_input:HTMLInputElement
	password_input:HTMLInputElement
	password_confirmation_input:HTMLInputElement
}
