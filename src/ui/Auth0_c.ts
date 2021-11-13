import { onDestroy } from 'svelte'
import type {
	auth0_body__T, auth0_client_id_body_I, auth0_grant_type_body_I, login_data_I, logout_auth0_token_error_T,
	open_auth0_forgot_password_check_email_T, open_auth0_login_T, password_realm_body__T, password_realm_body_T,
	post_auth0_auth_change_password_T, post_auth0_dbconnections_signup_T, post_auth0_oauth_token_body_I,
	post_auth0_oauth_token_T, post_auth0_passwordless_start_body_T, post_auth0_passwordless_start_optional_body_T,
	post_auth0_passwordless_start_T, signup_data_I
} from '@ctx-core/auth0'
import {
	auth0_body__b, auth0_opened_class$_b, auth0_token_error$_b, auth0_token_json$_b, clear_auth0_token_error_b,
	close_auth0_b, logout_auth0_token_error_b, open_auth0_forgot_password_check_email_b, open_auth0_login_b,
	password_realm_body__b, post_auth0_auth_change_password_b, post_auth0_dbconnections_signup_b,
	post_auth0_oauth_token_b, post_auth0_passwordless_start_b, validate_auth0_change_password,
	validate_auth0_forgot_password, validate_auth0_signup
} from '@ctx-core/auth0'
import { has_dom, dom_a_ } from '@ctx-core/dom'
import { noop } from '@ctx-core/function'
import { subscribe } from '@ctx-core/store'
import type { auth0_ui_Ctx } from '../auth0_ui_Ctx.js'
export class Auth0_c {
	constructor(protected ctx:auth0_ui_Ctx) {}
	readonly login_auth0_body_ = auth0_body__b</*@formatter:off*/
		auth0_ui_Ctx,
		'login_auth0_body_',
		login_data_password_realm_body_I
	/*@formatter:on*/>(this.ctx, 'login_auth0_body_')
	readonly login_password_realm_body_ = password_realm_body__b</*@formatter:off*/
		auth0_ui_Ctx,
		'login_password_realm_body_',
		login_data_password_realm_body_I
/*@formatter:on*/>(
		this.ctx,
		'login_password_realm_body_',
		this.login_auth0_body_
	)
	readonly signup_auth0_body_:auth0_body__T<signup_data_password_realm_body_I> = auth0_body__b</*@formatter:off*/
		auth0_ui_Ctx,
		'signup_auth0_body_',
		signup_data_password_realm_body_I
	/*@formatter:on*/>(this.ctx, 'signup_auth0_body_')
	readonly signup_password_realm_body_:password_realm_body__T<signup_data_password_realm_body_I> = password_realm_body__b</*@formatter:off*/
		auth0_ui_Ctx,
		'signup_password_realm_body_fn',
		signup_data_password_realm_body_I
	/*@formatter:on*/>(
		this.ctx, 'signup_password_realm_body_fn', this.signup_auth0_body_
	)
	readonly auth0_opened_class = auth0_opened_class$_b(this.ctx)
	readonly auth0_token_json$ = auth0_token_json$_b(this.ctx)
	readonly auth0_token_error = auth0_token_error$_b(this.ctx)
	readonly clear_auth0_token_error = clear_auth0_token_error_b(this.ctx)
	readonly close_auth0 = close_auth0_b(this.ctx)
	readonly logout_auth0_token_error:logout_auth0_token_error_T = logout_auth0_token_error_b(this.ctx)
	readonly open_auth0_login:open_auth0_login_T = open_auth0_login_b(this.ctx)
	readonly open_auth0_forgot_password_check_email:open_auth0_forgot_password_check_email_T = open_auth0_forgot_password_check_email_b(this.ctx)
	readonly post_auth0_dbconnections_signup:post_auth0_dbconnections_signup_T = post_auth0_dbconnections_signup_b(this.ctx)
	readonly post_auth0_oauth_token:post_auth0_oauth_token_T = post_auth0_oauth_token_b(this.ctx)
	readonly post_auth0_auth_change_password:post_auth0_auth_change_password_T = post_auth0_auth_change_password_b(this.ctx)
	readonly post_auth0_passwordless_start:post_auth0_passwordless_start_T = post_auth0_passwordless_start_b(this.ctx)
	readonly onMount = async (root:HTMLElement)=>{
		if (has_dom) {
			const unsubscribe =
				subscribe(this.auth0_opened_class, ()=>this.schedule_forms_clear(root))
			onDestroy(unsubscribe)
		}
	}
	readonly login = async (data:login_data_I, schedule_forms_clear = ()=>{})=>{
		const response = await this.post_auth0_oauth_token(
			this.login_password_realm_body_(data)
		)
		if (response.ok) {
			const auth0_token_json = await response.text()
			this.auth0_token_json$.$ = auth0_token_json
			schedule_forms_clear()
			this.close_auth0()
		} else {
			const $auth_token_error = await response.json()
			this.auth0_token_error.$ = $auth_token_error
			this.logout_auth0_token_error($auth_token_error)
		}
	}
	readonly signup = async (data:signup_data_I, schedule_forms_clear = ()=>{})=>{
		const response = await this.post_auth0_dbconnections_signup(this.signup_password_realm_body_(data))
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
			const auth0_token_error = { email }
			this.logout_auth0_token_error(auth0_token_error)
			return
		}
		schedule_forms_clear()
		await this.login({
			username: data.username,
			password: data.password,
		}, schedule_forms_clear)
	}
	readonly change_password = async (form:{ password:string }, schedule_forms_clear = ()=>{})=>{
		const { password } = form
		let error
		try {
			const response = await this.post_auth0_auth_change_password(password)
			const response_json = await response.json()
			if (!response.ok) {
				if (response.status == 401) {
					this.open_auth0_login()
					const auth0_token_error = { username: 'Authentication Error - Log in' }
					this.logout_auth0_token_error(auth0_token_error)
					return
				}
				error = response_json.error || 'Error changing Password'
			}
		} catch (e:any) {
			console.warn(e)
			error = e.message
		}
		if (error) {
			const auth0_token_error = { password: error }
			this.logout_auth0_token_error(auth0_token_error)
			return
		}
		schedule_forms_clear()
		this.close_auth0()
	}
	readonly schedule_forms_clear_:(root:HTMLElement)=>void = (root:HTMLElement)=>{
		return ()=>this.schedule_forms_clear(root)
	}
	readonly schedule_forms_clear = (root:HTMLElement)=>{
		setTimeout(()=>{
			this.clear_auth0_token_error()
			clear_inputs(dom_a_('input[type=text]', root))
			clear_inputs(dom_a_('input[type=password]', root))
		}, 100)
	}
	readonly onsubmit_signup = async (event:Event, ctx:onsubmit_signup_Ctx, schedule_forms_clear = ()=>{})=>{
		event.preventDefault()
		const {
			email_input,
			password_input,
			password_confirmation_input,
		} = ctx
		const username = email_input.value
		const password = password_input.value
		const password_confirmation = password_confirmation_input.value
		const auth0_token_error =
			validate_auth0_signup({
				username,
				password,
				password_confirmation
			})
		if (auth0_token_error) {
			this.logout_auth0_token_error(auth0_token_error)
			return false
		}
		await this.signup({
			username,
			password
		}, schedule_forms_clear)
		return
	}
	readonly onsubmit_login = async (event:Event, ctx:onsubmit_login_Ctx, schedule_forms_clear = ()=>{})=>{
		event.preventDefault()
		const { username_login_input, password_login_input } = ctx
		const username = username_login_input.value
		const password = password_login_input.value
		await this.login({ username, password }, schedule_forms_clear)
	}
	readonly onsubmit_forgot_password = async (event:Event, ctx:onsubmit_forgot_password_Ctx)=>{
		event.preventDefault()
		const { email_input } = ctx
		const email = email_input.value
		const data:post_auth0_passwordless_start_optional_body_T = {
			connection: 'email',
			send: 'link',
			email
		}
		const auth0_token_error = validate_auth0_forgot_password(data)
		if (auth0_token_error) {
			this.logout_auth0_token_error(auth0_token_error)
			return
		}
		await this.post_auth0_passwordless_start(
			this.login_auth0_body_(data) as post_auth0_passwordless_start_body_T
		)
		this.open_auth0_forgot_password_check_email()
	}
	readonly onsubmit_change_password = async (
		event:Event, ctx:onsubmit_change_password_Ctx, schedule_forms_clear = noop
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
	readonly onclose = async (event:MouseEvent)=>{
		event.preventDefault()
		this.close_auth0()
	}
}
function clear_inputs(inputs:NodeList) {
	for (let i = 0; i < inputs.length; i++) {
		const input = inputs[i] as HTMLInputElement
		input.value = ''
	}
}
export interface signup_data_password_realm_body_I
	extends signup_data_I,
		auth0_client_id_body_I,
		post_auth0_passwordless_start_body_T,
		password_realm_body_T,
		auth0_grant_type_body_I,
		post_auth0_oauth_token_body_I {}
export interface login_data_password_realm_body_I
	extends login_data_I,
		auth0_client_id_body_I,
		post_auth0_passwordless_start_body_T,
		password_realm_body_T,
		auth0_grant_type_body_I,
		post_auth0_oauth_token_body_I {}
export interface onsubmit_change_password_Ctx {
	password_input:HTMLInputElement
	password_confirmation_input:HTMLInputElement
}
export interface onsubmit_forgot_password_Ctx {
	email_input:HTMLInputElement
}
export interface onsubmit_login_Ctx {
	username_login_input:HTMLInputElement
	password_login_input:HTMLInputElement
}
export interface onsubmit_signup_Ctx {
	email_input:HTMLInputElement
	password_input:HTMLInputElement
	password_confirmation_input:HTMLInputElement
}
