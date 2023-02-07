import type {
	auth0__client_id__body_T,
	auth0__grant_type__body_T,
	auth0__login_data_T,
	password_realm__body_T,
	auth0__oauth_token__fetch__body_T,
	auth0__passwordless_start__fetch__body_T,
	auth0__passwordless_start__fetch__optional_body_T,
	auth0__signup_data_T
} from '@ctx-core/auth0'
import {
	auth0__body_,
	auth0__opened__class__,
	auth0__token__error__,
	auth0__token__json__,
	auth0__token__error__clear,
	auth0__close,
	auth0__token__error__logout,
	auth0__forgot_password__check_email__open,
	auth0__login__open,
	password_realm__body_,
	auth0__change_password__fetch_post,
	auth0__dbconnections_signup__fetch_get,
	auth0__oauth_token__fetch_get,
	auth0__passwordless_start__fetch_get,
	auth0__change_password__validate,
	auth0__forgot_password__validate,
	auth0__signup__validate
} from '@ctx-core/auth0'
import { dom_a_, has_dom } from '@ctx-core/dom'
import { noop } from '@ctx-core/function'
import type { Ctx } from '@ctx-core/object'
import type { Auth0Error } from 'auth0-js'
import { onDestroy } from 'svelte'
export class Auth0_c {
	constructor(protected ctx:Ctx) {}
	readonly login_auth0_body_ = (data:any)=>
		auth0__body_<login_data_password_realm_body_I>(
			this.ctx, data
		)
	readonly login_password_realm_body_ = (data:any)=>
		password_realm__body_<login_data_password_realm_body_I>(
			this.ctx,
			this.login_auth0_body_(data)
		)
	readonly signup_auth0_body_ = (data:any)=>
		auth0__body_<signup_data_password_realm_body_I>(this.ctx, data) as signup_data_password_realm_body_I
	readonly signup_password_realm_body_ = (data:any)=>
		password_realm__body_<signup_data_password_realm_body_I>(this.ctx, this.signup_auth0_body_(data))
	readonly auth0_opened_class = auth0__opened__class__(this.ctx)
	readonly auth0_token_json_ = auth0__token__json__(this.ctx)
	readonly auth0_token_error_ = auth0__token__error__(this.ctx)
	readonly auth0__close = ()=>auth0__close(this.ctx)
	readonly onMount = async (root:HTMLElement)=>{
		if (has_dom) {
			const unsubscribe =
				this.auth0_opened_class.subscribe(()=>this.schedule_forms_clear(root))
			onDestroy(unsubscribe)
		}
	}
	readonly login = async (data:auth0__login_data_T, schedule_forms_clear = ()=>{})=>{
		const [auth0_token, response] = await auth0__oauth_token__fetch_get(
			this.ctx, this.login_password_realm_body_(data)
		)
		if (response.ok) {
			const auth0_token_json = JSON.stringify(auth0_token)
			this.auth0_token_json_.$ = auth0_token_json
			schedule_forms_clear()
			this.auth0__close()
		} else {
			const auth_token_error = auth0_token as Auth0Error
			this.auth0_token_error_.$ = auth_token_error
			auth0__token__error__logout(this.ctx, auth_token_error)
		}
	}
	readonly signup = async (data:auth0__signup_data_T, schedule_forms_clear = ()=>{})=>{
		const [auth0_userinfo] = await auth0__dbconnections_signup__fetch_get(
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
			auth0__token__error__logout(this.ctx, auth0_token_error)
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
			const [response_json, response] = await auth0__change_password__fetch_post(this.ctx, password)
			if (!response.ok) {
				if (response.status == 401) {
					auth0__login__open(this.ctx)
					const auth0_token_error = { username: 'Authentication Error - Log in' }
					auth0__token__error__logout(this.ctx, auth0_token_error)
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
			auth0__token__error__logout(this.ctx, auth0_token_error)
			return
		}
		schedule_forms_clear()
		this.auth0__close()
	}
	readonly schedule_forms_clear_:(root:HTMLElement)=>void = (root:HTMLElement)=>{
		return ()=>this.schedule_forms_clear(root)
	}
	readonly schedule_forms_clear = (root:HTMLElement)=>{
		setTimeout(()=>{
			auth0__token__error__clear(this.ctx)
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
			auth0__signup__validate({
				email,
				password,
				password_confirmation
			})
		if (auth0_token_error) {
			auth0__token__error__logout(this.ctx, auth0_token_error)
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
		const data:auth0__passwordless_start__fetch__optional_body_T = {
			connection: 'email',
			send: 'link',
			email
		}
		const auth0_token_error = auth0__forgot_password__validate(data)
		if (auth0_token_error) {
			auth0__token__error__logout(this.ctx, auth0_token_error)
			return
		}
		await auth0__passwordless_start__fetch_get(
			this.ctx, this.login_auth0_body_(data) as auth0__passwordless_start__fetch__body_T
		)
		auth0__forgot_password__check_email__open(this.ctx)
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
			auth0__change_password__validate(
				{
					password,
					password_confirmation
				})
		if (auth0_token_error) {
			auth0__token__error__logout(this.ctx, auth0_token_error)
			throw auth0_token_error
		}
		return await this.change_password({ password }, schedule_forms_clear)
	}
	readonly onclose = async (event:MouseEvent)=>{
		event.preventDefault()
		this.auth0__close()
	}
}
function clear_inputs(inputs:NodeList) {
	for (let i = 0; i < inputs.length; i++) {
		const input = inputs[i] as HTMLInputElement
		input.value = ''
	}
}
export interface signup_data_password_realm_body_I
	extends auth0__signup_data_T,
		auth0__client_id__body_T,
		auth0__passwordless_start__fetch__body_T,
		password_realm__body_T,
		auth0__grant_type__body_T,
		auth0__oauth_token__fetch__body_T {}
export interface login_data_password_realm_body_I
	extends auth0__login_data_T,
		auth0__client_id__body_T,
		auth0__passwordless_start__fetch__body_T,
		password_realm__body_T,
		auth0__grant_type__body_T,
		auth0__oauth_token__fetch__body_T {}
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
