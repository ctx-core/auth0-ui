<script lang="ts">
import { AUTH0_DOMAIN$_b, auth0_token_error$_b, open_auth0_forgot_password_b, open_auth0_login_b } from '@ctx-core/auth0'
import Auth0_Dialog_Close from './Auth0_Dialog_Close.svelte'
import { Auth0_c } from './Auth0_c.js'
import { getContext_auth0_ui_ctx } from './getContext_auth0_ui_ctx'
export let class__error = ''
export let class__input = ''
export let class__button = ''
export let class__label = '.js'
const ctx = getContext_auth0_ui_ctx()
const AUTH0_DOMAIN$ = AUTH0_DOMAIN$_b(ctx)
const auth0_token_error$ = auth0_token_error$_b(ctx)
const open_auth0_login = open_auth0_login_b(ctx)
const open_auth0_forgot_password = open_auth0_forgot_password_b(ctx)
const _ = new Auth0_c(ctx)
let root, signup_email_input, signup_password_input, signup_password_confirmation_input
let email_error //region
$: email_error = $auth0_token_error$ && $auth0_token_error$.email //endregion
let password_error //region
$: password_error = $auth0_token_error$ && $auth0_token_error$.password //endregion
let password_error_confirmation //region
$: password_error_confirmation = $auth0_token_error$ && password_error_confirmation //endregion
let error_text
$: {
	let error_text_a = []
	if ($auth0_token_error$) {
		for (let key in $auth0_token_error$) {
			error_text_a.push($auth0_token_error$[key])
		}
	}
	error_text = error_text_a.join('<br>') || ''
}
</script>

<div bind:this={root} class="form signup">
	<Auth0_Dialog_Close></Auth0_Dialog_Close>
	<h1><slot name="signup_text">Sign Up</slot></h1>
	<form
		action="https://{$AUTH0_DOMAIN$}/dbconnections/signup"
		accept-charset="UTF-8"
		method="post"
		on:submit="{event =>
			_.onsubmit_signup(event, {
				signup_email_input,
				signup_password_input,
				signup_password_confirmation_input
			}, _._schedule_forms_clear(root))
		}"
	>
		{#if $auth0_token_error$}
			<ul>
				<li class="error {class__error}">
					{error_text}
				</li>
			</ul>
		{/if}
		<fieldset>
			<label class="field">
				<div class="{class__label}">Email</div>
				<input
					bind:this="{signup_email_input}"
					placeholder="your@email.com"
					required="required"
					autocomplete="email"
					class="form-control {class__input}"
					class:invalid="{email_error}"
					type="email"
					id="email-signup"
					name="email"/>
			</label>
			<label class="field">
				<div class="{class__label}">Password</div>
				<input
					bind:this="{signup_password_input}"
					placeholder="**********"
					required="required"
					class="{class__input}"
					class:invalid="{password_error}"
					id="password-signup"
					type="password"
					name="password"/>
			</label>
			<label class="field">
				<div class="{class__label}">Confirm Password</div>
				<input
					bind:this="{signup_password_confirmation_input}"
					placeholder="**********"
					required="required"
					class="{class__input}"
					class:invalid="{password_error_confirmation}"
					type="password"
					name="password_confirmation"
					id="password_confirmation-signup"/>
			</label>
			<slot name="tos__signup">
				<p>
					By clicking ‘Sign up’ you agree to the terms of this Website <br>
					<a href="." target="_blank">Terms of Service</a>
					and
					<a href="." target="_blank">Privacy Policy</a>
				</p>
			</slot>
		</fieldset>
		<footer>
			<input
				type="submit"
				value="Sign up"
				class="button {class__button}"
			/>
			<label
				class="navigation__auth {class__label}"
				on:click="{open_auth0_login}"
			>Have an account? Log in&hellip;</label>
			<label
				class="navigation__auth {class__label}"
				on:click="{open_auth0_forgot_password}"
			>Forgot Password?</label>
		</footer>
	</form>
</div>
