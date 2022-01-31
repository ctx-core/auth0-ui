import type { Auth0Error } from 'auth0-js'
import { onDestroy } from 'svelte'
import type {
	auth0_client_id_body_I, auth0_grant_type_body_I, login_data_I, password_realm_body_T, post_auth0_oauth_token_body_I,
	post_auth0_passwordless_start_body_T, post_auth0_passwordless_start_optional_body_T, signup_data_I
} from '@ctx-core/auth0'
import {
	auth0_body_, auth0_opened_class$_, auth0_token_error$_, auth0_token_json$_, clear_auth0_token_error,
	close_auth0, logout_auth0_token_error, open_auth0_forgot_password_check_email, open_auth0_login,
	password_realm_body_, post_auth0_auth_change_password, post_auth0_dbconnections_signup,
	post_auth0_oauth_token, post_auth0_passwordless_start, validate_auth0_change_password,
	validate_auth0_forgot_password, validate_auth0_signup
} from '@ctx-core/auth0'
import { has_dom, dom_a_ } from '@ctx-core/dom'
import { noop } from '@ctx-core/function'
import type { Ctx } from '@ctx-core/object'
export class Auth0_c {
	constructor(protected ctx:Ctx) {}
	readonly login_auth0_body_ = (data:any)=>
		auth0_body_<login_data_password_realm_body_I>(
			this.ctx, data
		)
	readonly login_password_realm_body_ = (data:any)=>
		password_realm_body_<login_data_password_realm_body_I>(
			this.ctx,
			this.login_auth0_body_(data)
		)
	readonly signup_auth0_body_ = (data:any)=>
		auth0_body_<signup_data_password_realm_body_I>(this.ctx, data) as signup_data_password_realm_body_I
	readonly signup_password_realm_body_ = (data:any)=>
		password_realm_body_<signup_data_password_realm_body_I>(this.ctx, this.signup_auth0_body_(data))
	readonly auth0_opened_class = auth0_opened_class$_(this.ctx)
	readonly auth0_token_json$ = auth0_token_json$_(this.ctx)
	readonly auth0_token_error$ = auth0_token_error$_(this.ctx)
	readonly close_auth0 = ()=>close_auth0(this.ctx)
	readonly onMount = async (root:HTMLElement)=>{
		if (has_dom) {
			const unsubscribe =
				this.auth0_opened_class.subscribe(()=>this.schedule_forms_clear(root))
			onDestroy(unsubscribe)
		}
	}
	readonly login = async (data:login_data_I, schedule_forms_clear = ()=>{})=>{
		const [auth0_token, response] = await post_auth0_oauth_token(
			this.ctx, this.login_password_realm_body_(data)
		)
		if (response.ok) {
			const auth0_token_json = JSON.stringify(auth0_token)
			this.auth0_token_json$.$ = auth0_token_json
			schedule_forms_clear()
			this.close_auth0()
		} else {
			const auth_token_error = auth0_token as Auth0Error
			this.auth0_token_error$.$ = auth_token_error
			logout_auth0_token_error(this.ctx, auth_token_error)
		}
	}
	readonly signup = async (data:signup_data_I, schedule_forms_clear = ()=>{})=>{
		const [auth0_userinfo] = await post_auth0_dbconnections_signup(
			this.ctx,
			this.signup_password_realm_body_(data))
		const auth0_userinfo_Auth0Error = auth0_userinfo as Auth0Error
		const { statusCode } = auth0_userinfo_Auth0Error
		if (statusCode) {
			const {
				code,
				description
			} = auth0_userinfo_Auth0Error
			const email =
				code === 'user_exists'
				? 'This Email is already signed up'
				: description || ''
			const auth0_token_error = { email }
			logout_auth0_token_error(this.ctx, auth0_token_error)
			return
		}
		schedule_forms_clear()
		await this.login({
			username: data.email,
			password: data.password,
		}, schedule_forms_clear)
	}
	readonly change_password = async (form:{ password:string }, schedule_forms_clear = ()=>{})=>{
		const { password } = form
		let error
		try {
			const [response_json, response] = await post_auth0_auth_change_password(this.ctx, password)
			if (!response.ok) {
				if (response.status == 401) {
					open_auth0_login(this.ctx)
					const auth0_token_error = { username: 'Authentication Error - Log in' }
					logout_auth0_token_error(this.ctx, auth0_token_error)
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
			logout_auth0_token_error(this.ctx, auth0_token_error)
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
			clear_auth0_token_error(this.ctx)
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
			logout_auth0_token_error(this.ctx, auth0_token_error)
			return false
		}
		await this.signup({
			email,
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
			logout_auth0_token_error(this.ctx, auth0_token_error)
			return
		}
		await post_auth0_passwordless_start(
			this.ctx, this.login_auth0_body_(data) as post_auth0_passwordless_start_body_T
		)
		open_auth0_forgot_password_check_email(this.ctx)
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
			logout_auth0_token_error(this.ctx, auth0_token_error)
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
