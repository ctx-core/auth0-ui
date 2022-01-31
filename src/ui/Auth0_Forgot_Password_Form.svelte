<script lang="ts">
import { AUTH0_DOMAIN$_, auth0_token_error$_, open_auth0_login, open_auth0_signup } from '@ctx-core/auth0'
import { getContext_auth0_ui_ctx } from '../getContext_auth0_ui_ctx.js'
import { Auth0_c } from './Auth0_c.js'
import Auth0_Dialog_Close from './Auth0_Dialog_Close.svelte'
export let error_class = '', input_class = '', button_class = '', label_class = '.js'
const ctx = getContext_auth0_ui_ctx()
const AUTH0_DOMAIN$ = AUTH0_DOMAIN$_(ctx)
const auth0_token_error$ = auth0_token_error$_(ctx)
const _ = new Auth0_c(ctx)
let email_input:HTMLInputElement, error:string
$: error = $auth0_token_error$?.error
</script>

<div class="form forgot_password">
	<Auth0_Dialog_Close></Auth0_Dialog_Close>
	<h1>Forgot Password</h1>
	<form
		action="https://{$AUTH0_DOMAIN$}/passwordless/start"
		accept-charset="UTF-8"
		method="post"
		on:submit={event => _.onsubmit_forgot_password(event, { email_input })}
	>
		{#if $auth0_token_error$}
			<ul>
				<li class="error {error_class}">
					{$auth0_token_error$.error}: {$auth0_token_error$.error_description}
				</li>
			</ul>
		{/if}
		<fieldset>
			<label class="field">
				<div class={label_class}>Email</div>
				<input
					bind:this={email_input}
					placeholder="your@email.com"
					required="required"
					class="form-control {input_class}"
					class:invalid={error}
					type="email"
					id="email-forgot_password"
					name="email"/>
			</label>
		</fieldset>
		<footer>
			<input
				type="submit"
				value="Reset Password"
				class="button {button_class}"
			/>
			<label
				class="auth_navigation {label_class}"
				on:click={()=>open_auth0_login(ctx)}
			>Have an account? Log in&hellip;</label>
			<label
				class="auth_navigation {label_class}"
				on:click={()=>open_auth0_signup(ctx)}
			>Don't have an account? Signup&hellip;</label>
		</footer>
	</form>
</div>
