<script lang="ts">
import {
	AUTH0_DOMAIN_b,
	auth0_token_error_b,
	auth0_token_error_txt_b,
	open_auth0_forgot_password_b, open_auth0_signup_b
} from '@ctx-core/auth0'
import Close__Dialog__Auth0 from './Close__Dialog__Auth0.svelte'
import { Auth0_c } from './Auth0_c'
export let ctx
export let error_class = ''
export let input_class = ''
export let button_class = ''
export let label_class = ''
const auth0_token_error = auth0_token_error_b(ctx)
const auth0_token_error_txt = auth0_token_error_txt_b(ctx)
const AUTH0_DOMAIN = AUTH0_DOMAIN_b(ctx)
const open_auth0_signup = open_auth0_signup_b(ctx)
const open_auth0_forgot_password = open_auth0_forgot_password_b(ctx)
const _ = new Auth0_c(ctx)
let root
let username_login_input, password_login_input
let error__username//region
$: error__username = $auth0_token_error && $auth0_token_error.username //endregion
let error__password//region
$: error__password = $auth0_token_error && $auth0_token_error.password //endregion
</script>

<div bind:this="{root}" class="form {$$props.class||''}">
	<Close__Dialog__Auth0></Close__Dialog__Auth0>
	<h1><slot name="login_text">Welcome</slot></h1>
	<form
		action="https://{$AUTH0_DOMAIN}/oauth/token"
		accept-charset="UTF-8"
		method="post"
		on:submit="{event =>
			_.onsubmit_login(event, {
				username_login_input,
				password_login_input
			}, _._schedule_forms_clear(root))}"
	>
		{#if $auth0_token_error_txt}
			<ul>
				<li class="error {error_class}">
					{$auth0_token_error_txt}
				</li>
			</ul>
		{/if}
		<fieldset>
			<label class="field">
				<div class="{label_class}">Email</div>
				<input
					bind:this="{username_login_input}"
					placeholder="your@email.com"
					required="required"
					class="form-control {input_class}"
					class:invalid="{error__username}"
					type="email"
					id="username-login"
					name="username"/>
			</label>
			<label class="field">
				<div class="{label_class}">Password</div>
				<input
					bind:this="{password_login_input}"
					placeholder="**********"
					required="required"
					class="{input_class}"
					class:invalid="{error__password}"
					id="password-login"
					type="password"
					name="password"/>
			</label>
		</fieldset>
		<footer>
			<input
				type="submit"
				value="Login"
				class="button {button_class}"
			/>
			<label
				class="navigation__auth {label_class}"
				on:click="{open_auth0_signup}"
			>Don't have an account? Signup&hellip;</label>
			<label
				class="navigation__auth {label_class}"
				on:click="{open_auth0_forgot_password}"
			>Forgot Password?</label>
		</footer>
	</form>
</div>
