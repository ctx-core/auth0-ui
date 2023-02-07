<script lang="ts">
import {
	AUTH0_DOMAIN__, auth0__token__error__, auth0__forgot_password__open, auth0__login__open,
} from '@ctx-core/auth0'
import { getContext_auth0_ui_ctx } from '../getContext_auth0_ui_ctx.js'
import { Auth0_c } from './Auth0_c.js'
import Auth0_Dialog_Close from './Auth0_Dialog_Close.svelte'
export let error_class = '', input_class = '', button_class = '', label_class = '.js'
const ctx = getContext_auth0_ui_ctx()
const AUTH0_DOMAIN_ = AUTH0_DOMAIN__(ctx)
const auth0_token_error_ = auth0__token__error__(ctx)
const _ = new Auth0_c(ctx)
let root, signup_email_input, signup_password_input, signup_password_confirmation_input
let error_username:string|undefined //region
$: error_username = $auth0_token_error_?.username //endregion
let error_password:string|undefined //region
$: error_password = $auth0_token_error_?.password //endregion
let error_password_confirmation:boolean //region
$: error_password_confirmation = !!$auth0_token_error_ //endregion
let error_text:string
$: {
	let error_text_a = []
	if ($auth0_token_error_) {
		for (let key in $auth0_token_error_) {
			error_text_a.push($auth0_token_error_[key])
		}
	}
	error_text = error_text_a.join('<br>') || ''
}
</script>

<div bind:this={root} class="form signup">
	<Auth0_Dialog_Close/>
	<h1><slot name="signup_text">Sign Up</slot></h1>
	<form
		action="https://{$AUTH0_DOMAIN_}/dbconnections/signup"
		accept-charset="UTF-8"
		method="post"
		on:submit={event =>
			_.onsubmit_signup(event, {
				signup_email_input,
				signup_password_input,
				signup_password_confirmation_input
			}, _.schedule_forms_clear(root))
		}
	>
		{#if $auth0_token_error_}
			<ul>
				<li class="error {error_class}">
					{error_text}
				</li>
			</ul>
		{/if}
		<fieldset>
			<label class="field">
				<div class={label_class}>Email</div>
				<input
					bind:this={signup_email_input}
					placeholder="your@email.com"
					required="required"
					autocomplete="email"
					class="form-control {input_class}"
					class:invalid={error_username}
					type="email"
					id="email-signup"
					name="email"/>
			</label>
			<label class="field">
				<div class={label_class}>Password</div>
				<input
					bind:this={signup_password_input}
					placeholder="**********"
					required="required"
					class={input_class}
					class:invalid={error_password}
					id="password-signup"
					type="password"
					name="password"/>
			</label>
			<label class="field">
				<div class={label_class}>Confirm Password</div>
				<input
					bind:this={signup_password_confirmation_input}
					placeholder="**********"
					required="required"
					class={input_class}
					class:invalid={error_password_confirmation}
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
				class="button {button_class}"
			/>
			<label
				class="auth_navigation {label_class}"
				on:click={()=>auth0__login__open(ctx)}
			>Have an account? Log in&hellip;</label>
			<label
				class="auth_navigation {label_class}"
				on:click={()=>auth0__forgot_password__open(ctx)}
			>Forgot Password?</label>
		</footer>
	</form>
</div>
