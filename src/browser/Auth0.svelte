<script>
import { setContext } from 'svelte'
import {
	auth0_forgot_password_opened_b, auth0_opened_class_b, auth0_login_opened_b, auth0_signup_opened_b,
	auth0_forgot_password_check_email_opened_b, auth0_change_password_opened_b
} from '@ctx-core/auth0'
import { Auth0_c } from './Auth0_c'
import { auth0_ui_ctx_key } from './auth0_ui_ctx_key'
import Close__Dialog__Auth0 from './Close__Dialog__Auth0.svelte'
import Form__Login__Auth0 from './Form__Login__Auth0.svelte'
import Form__Signup__Auth0 from './Form__Signup__Auth0.svelte'
import Form__Forgot_Password__Auth0 from './Form__Forgot_Password__Auth0.svelte'
import Form__Check_Email__Forgot_Password__Auth0 from './Form__Check_Email__Forgot_Password__Auth0.svelte'
import Form__Change_Password__Auth0 from './Form__Change_Password__Auth0.svelte'
export let ctx = {}
export let dialog = false
setContext(auth0_ui_ctx_key, ctx)
const auth0_change_password_opened = auth0_change_password_opened_b(ctx)
const auth0_opened_class = auth0_opened_class_b(ctx)
const auth0_forgot_password_check_email_opened = auth0_forgot_password_check_email_opened_b(ctx)
const auth0_forgot_password_opened = auth0_forgot_password_opened_b(ctx)
const auth0_login_opened = auth0_login_opened_b(ctx)
const auth0_signup_opened = auth0_signup_opened_b(ctx)
const c = new Auth0_c(ctx)
</script>

<div
	class="Auth0 {$auth0_opened_class} {$$props.class || ''}"
	class:dialog="{dialog}"
	class:visible={!!$auth0_opened_class}
>
	<Close__Dialog__Auth0></Close__Dialog__Auth0>
	{#if $auth0_login_opened}
		<Form__Login__Auth0 {...$$props}></Form__Login__Auth0>
	{:else if $auth0_signup_opened}
		<Form__Signup__Auth0 {...$$props}>
			<div slot="tos__signup"></div>
		</Form__Signup__Auth0>
	{:else if $auth0_forgot_password_opened}
		<Form__Forgot_Password__Auth0 {...$$props}></Form__Forgot_Password__Auth0>
	{:else if $auth0_forgot_password_check_email_opened}
		<Form__Check_Email__Forgot_Password__Auth0></Form__Check_Email__Forgot_Password__Auth0>
	{:else if $auth0_change_password_opened}
		<Form__Change_Password__Auth0 {...$$props}></Form__Change_Password__Auth0>
	{/if}
	<slot></slot>
</div>

<style type="text/scss">
:global(.Auth0) {
	display: block;
	overflow: hidden;
	&.dialog {
		:global(div) {
			:global(.close) {
				display: block;
			}
		}
	}
	:global(h1) {
		font-size: 2rem;
		text-align: center;
	}
	[name=navigation__auth] {
		display: none;
		~ .form {
			display: none;
		}
		&.navigation__auth-signup:checked {
			~ .signup {
				display: block;
			}
		}
		&.navigation__auth-login:checked {
			~ .login {
				display: block;
			}
		}
		&.navigation__auth-forgot_password:checked {
			~ .forgot_password {
				display: block;
			}
		}
		&.navigation__auth-forgot_password_check_email:checked {
			~ .forgot_password_check_email {
				display: block;
			}
		}
		&.navigation__auth-change_password:checked {
			~ .change_password {
				display: block;
			}
		}
	}
	:global(label.navigation__auth) {
		color: #3EBBC0;
		font-weight: bold;
		&:hover {
			text-decoration: underline;
		}
	}
	> :global(div) {
		position: relative;
		height: 100%;
		> :global(.close) {
			display: none;
			position: absolute;
			right: 0;
		}
	}
	:global(form) {
		:global(input) {
			line-height: 1.8rem;
			border-color: transparent;
			border-bottom: 2px solid lightgrey;
			&.invalid {
				border-color: red;
			}
		}
		:global(label) {
			display: block;
		}
		:global(fieldset) {
			clear: both;
			border: none;
			:global(.field) {
				width: 20em;
				margin: 0 auto;
				display: block;
				clear: both;
				text-align: left;
				:global(input) {
					display: block;
					width: 100%;
					padding: 0.2em;
					color: black;
				}
			}
			:global(p) {
				margin-bottom: 0;
				-webkit-margin-after: 0;
			}
		}
		:global(footer) {
			margin-top: 1rem;
			text-align: center;
			:global(.button) {
				float: none;
				width: 10em;
				padding: 0.4rem;
				color: white;
				background-color: #3EBBC0;
				border-radius: 5px;
				border: none;
				&:hover {
					background-color: #5CC6CA;
				}
			}
			:global(label) {
				margin-top: 1em;
			}
		}
	}
	:global(.error) {
		color: red;
	}
}
</style>
