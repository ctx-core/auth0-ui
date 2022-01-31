<script lang="ts">
import {
	AUTH0_DOMAIN$_, auth0_token_error$_, auth0_token_error_txt$_, open_auth0_forgot_password, open_auth0_signup
} from '@ctx-core/auth0'
import type { Ctx } from '@ctx-core/object'
import { Auth0_c } from './Auth0_c.js'
import Auth0_Dialog_Close from './Auth0_Dialog_Close.svelte'
export let ctx:Ctx, error_class = '', input_class = '', button_class = '', label_class = '.js'
const auth0_token_error$ = auth0_token_error$_(ctx)
const auth0_token_error_txt$ = auth0_token_error_txt$_(ctx)
const AUTH0_DOMAIN = AUTH0_DOMAIN$_(ctx)
const _ = new Auth0_c(ctx)
let root:HTMLDivElement
let username_login_input:HTMLInputElement, password_login_input:HTMLInputElement
let error_username:string|undefined//region
$: error_username = $auth0_token_error$?.username //endregion
let error_password:string|undefined//region
$: error_password = $auth0_token_error$?.password //endregion
</script>

<div bind:this={root} class="form {$$props.class||''}">
	<Auth0_Dialog_Close></Auth0_Dialog_Close>
	<h1><slot name="login_text">Welcome</slot></h1>
	<form
		action="https://{$AUTH0_DOMAIN}/oauth/token"
		accept-charset="UTF-8"
		method="post"
		on:submit={event =>
			_.onsubmit_login(event, {
				username_login_input,
				password_login_input
			}, ()=>_.schedule_forms_clear(root))}
	>
		{#if $auth0_token_error_txt$}
			<ul>
				<li class="error {error_class}">
					{$auth0_token_error_txt$}
				</li>
			</ul>
		{/if}
		<fieldset>
			<label class="field">
				<div class={label_class}>Email</div>
				<input
					bind:this={username_login_input}
					placeholder="your@email.com"
					required="required"
					class="form-control {input_class}"
					class:invalid={error_username}
					type="email"
					id="username-login"
					name="username"/>
			</label>
			<label class="field">
				<div class={label_class}>Password</div>
				<input
					bind:this={password_login_input}
					placeholder="**********"
					required="required"
					class={input_class}
					class:invalid={error_password}
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
				class="auth_navigation {label_class}"
				on:click={()=>open_auth0_signup(ctx)}
			>Don't have an account? Signup&hellip;</label>
			<label
				class="auth_navigation {label_class}"
				on:click={()=>open_auth0_forgot_password(ctx)}
			>Forgot Password?</label>
		</footer>
	</form>
</div>
