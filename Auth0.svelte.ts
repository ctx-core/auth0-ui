import { onDestroy } from 'svelte'
import { get } from 'svelte/store'
import { __AUTH0_DOMAIN } from '@ctx-core/auth0/store'
import { _has__dom, __dom } from '@ctx-core/dom'
import { subscribe } from '@ctx-core/store'
import {
	close__auth0,
	set__error__token__auth0,
	clear__error__token__auth0,
} from '@ctx-core/auth0/store'
import {
	post__signup__dbconnections__auth0,
	post__token__oauth__auth0,
	post__start__passwordless__auth0,
	post__change_password__auth,
	_body__password_realm,
	_body
} from '@ctx-core/auth0/fetch'
import {
	__json__token__auth0,
	__class__opened__auth0,
	open__login__auth0,
	open__check_email__forgot_password__auth0,
	__error__token__auth0,
} from '@ctx-core/auth0/store'
import {
	validate__signup,
	validate__forgot_password,
	validate__change_password
} from '@ctx-core/auth0/validation'
export async function onMount__auth0(root) {
	if (_has__dom()) {
		const unsubscribe =
			subscribe(__class__opened__auth0, ()=>schedule__clear__forms(root))
		onDestroy(unsubscribe)
	}
}
export function _onMount__auth0(root) {
	return ()=>onMount__auth0(root)
}
export async function __close(event) {
	event.preventDefault()
	close__auth0()
}
export interface Ctx__submit__signup {
	email__signup:HTMLInputElement
	password__signup:HTMLInputElement
	password_confirmation__signup:HTMLInputElement
}
export async function __submit__signup(event:Event, ctx:Ctx__submit__signup, schedule__clear__forms = ()=>{}) {
	event.preventDefault()
	const {
		email__signup,
		password__signup,
		password_confirmation__signup,
	} = ctx
	const email = email__signup.value
	const password = password__signup.value
	const password_confirmation = password_confirmation__signup.value
	const error__token__auth0 =
		validate__signup({
			email,
			password,
			password_confirmation
		})
	if (error__token__auth0) {
		set__error__token__auth0(error__token__auth0)
		return false
	}
	await signup({
		email,
		password
	}, schedule__clear__forms)
}
export interface Ctx__submit__login {
	username__login:HTMLInputElement
	password__login:HTMLInputElement
}
export function __submit__login(event:Event, ctx:Ctx__submit__login, schedule__clear__forms = ()=>{}) {
	event.preventDefault()
	const { username__login, password__login } = ctx
	const username = username__login.value
	const password = password__login.value
	login({ username, password }, schedule__clear__forms)
}
export interface Ctx__submit__forgot_password {
	email__forgot_password:HTMLInputElement
}
export async function __submit__forgot_password(event:Event, ctx:Ctx__submit__forgot_password) {
	event.preventDefault()
	const { email__forgot_password } = ctx
	const email = email__forgot_password.value
	const form =
		{
			connection: 'email',
			send: 'link',
			email
		}
	const error__token__auth0 = validate__forgot_password(form)
	if (error__token__auth0) {
		set__error__token__auth0(error__token__auth0)
		return
	}
	await post__start__passwordless__auth0(_body(form))
	open__check_email__forgot_password__auth0()
}
export interface Ctx__submit__signup {
	password__change_password:HTMLInputElement
	password_confirmation__change_password:HTMLInputElement
}
export function __submit__change_password(event:Event, ctx, schedule__clear__forms = ()=>{}) {
	event.preventDefault()
	const {
		password__change_password,
		password_confirmation__change_password,
	} = ctx
	const password = password__change_password.value
	const password_confirmation = password_confirmation__change_password.value
	const error__token__auth0 =
		validate__change_password(
			{
				password,
				password_confirmation
			})
	if (error__token__auth0) {
		set__error__token__auth0(error__token__auth0)
		throw error__token__auth0
	}
	return change_password({ password }, schedule__clear__forms)
}
async function signup(form, schedule__clear__forms = ()=>{}) {
	const response =
		await post__signup__dbconnections__auth0(_body__password_realm(form))
	const userinfo__auth0 = await response.json()
	const { statusCode } = userinfo__auth0
	if (statusCode) {
		const {
			code,
			description
		} = userinfo__auth0
		const email =
			code === 'user_exists'
			? 'This Email is already signed up'
			: description
		const error__token__auth0 = { email }
		set__error__token__auth0(error__token__auth0)
		return
	}
	schedule__clear__forms()
	login({
		username: form.email,
		password: form.password
	}, schedule__clear__forms)
}
async function login(form, schedule__clear__forms = ()=>{}) {
	const AUTH0_DOMAIN = get(__AUTH0_DOMAIN)
	const response =
		await post__token__oauth__auth0(
			{ AUTH0_DOMAIN, ..._body__password_realm(form) })
	if (response.ok) {
		const json__token__auth0 = await response.text()
		__json__token__auth0.set(json__token__auth0)
		schedule__clear__forms()
		close__auth0()
	} else {
		const error__token__auth0 = await response.json()
		__error__token__auth0.set(error__token__auth0)
		set__error__token__auth0(error__token__auth0)
	}
}
async function change_password(form, schedule__clear__forms = ()=>{}) {
	const { password } = form
	let error
	try {
		const response = await post__change_password__auth(password)
		const __json = await response.json()
		if (!response.ok) {
			if (response.status == 401) {
				open__login__auth0()
				const error__token__auth0 = { email: 'Authentication Error - Log in' }
				set__error__token__auth0(error__token__auth0)
				return
			}
			error = __json.error || 'Error changing Password'
		}
	} catch (e) {
		console.warn(e)
		error = e.message
	}
	if (error) {
		const error__token__auth0 = { password: error }
		set__error__token__auth0(error__token__auth0)
		return
	}
	schedule__clear__forms()
	close__auth0()
}
export function _schedule__clear__forms(root) {
	return ()=>schedule__clear__forms(root)
}
export function schedule__clear__forms(root) {
	setTimeout(()=>{
		clear__error__token__auth0()
		clear__inputs(__dom('input[type=text]', root))
		clear__inputs(__dom('input[type=password]', root))
	}, 100)
}
function clear__inputs(inputs) {
	for (let i = 0; i < inputs.length; i++) {
		const input = inputs[i]
		input.value = ''
	}
}
