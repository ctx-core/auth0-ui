<script lang="ts">
import { AUTH0_DOMAIN__, auth0__token__error__, auth0__login__open, auth0__signup__open } from '@ctx-core/auth0'
import { auth0__ui__o__getContext } from '../auth0__ui__o__getContext.js'
import { Auth0_c } from './Auth0_c.js'
import Auth0_Dialog_Close from './Auth0_Dialog_Close.svelte'
export let error_class = '', input_class = '', button_class = '', label_class = '.js'
const ctx = auth0__ui__o__getContext()
const AUTH0_DOMAIN_ = AUTH0_DOMAIN__(ctx)
const auth0__token__error_ = auth0__token__error__(ctx)
const _ = new Auth0_c(ctx)
let email_input:HTMLInputElement, error:typeof $auth0_token_error_?.error
$: error = $auth0_token_error_?.error
</script>

<div class="form forgot_password">
	<Auth0_Dialog_Close></Auth0_Dialog_Close>
	<h1>Forgot Password</h1>
	<form
		action="https://{$AUTH0_DOMAIN_}/passwordless/start"
		accept-charset="UTF-8"
		method="post"
		on:submit={event => _.forgot_password__onsubmit(event, { email_input })}
	>
		{#if $auth0_token_error_}
			<ul>
				<li class="error {error_class}">
					{$auth0_token_error_.error}: {$auth0_token_error_.error_description}
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
				on:click={()=>auth0__login__open(ctx)}
			>Have an account? Log in&hellip;</label>
			<label
				class="auth_navigation {label_class}"
				on:click={()=>auth0__signup__open(ctx)}
			>Don't have an account? Signup&hellip;</label>
		</footer>
	</form>
</div>
