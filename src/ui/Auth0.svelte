<script>
import { setContext } from 'svelte'
import {
	auth0_forgot_password_opened_b, auth0_opened_class$_b, auth0_login_opened_b, auth0_signup_opened_b,
	auth0_forgot_password_check_email_opened_b, auth0_change_password_opened_b
} from '@ctx-core/auth0'
import { Auth0_c } from './Auth0_c'
import { auth0_ui_ctx_key } from '../src/browser'
import Auth0_Dialog_Close from './Auth0_Dialog_Close.svelte'
import Auth0_Login_Form from './Auth0_Login_Form.svelte'
import Auth0_Signup_Form from './Auth0_Signup_Form.svelte'
import Auth0_Forgot_Password_Form from './Auth0_Forgot_Password_Form.svelte'
import Auth0_Forgot_Password_Check_Email_Form from './Auth0_Forgot_Password_Check_Email_Form.svelte'
import Auth0_Change_Password_Form from './Auth0_Change_Password_Form.svelte'
export let ctx = {}
export let dialog = false
setContext(auth0_ui_ctx_key, ctx)
const auth0_change_password_opened = auth0_change_password_opened_b(ctx)
const auth0_opened_class$ = auth0_opened_class$_b(ctx)
const auth0_forgot_password_check_email_opened = auth0_forgot_password_check_email_opened_b(ctx)
const auth0_forgot_password_opened = auth0_forgot_password_opened_b(ctx)
const auth0_login_opened = auth0_login_opened_b(ctx)
const auth0_signup_opened = auth0_signup_opened_b(ctx)
const c = new Auth0_c(ctx)
</script>

<div
	class="Auth0 {$auth0_opened_class$} {$$props.class || ''}"
	class:dialog="{dialog}"
	class:visible={!!$auth0_opened_class$}
>
	<Auth0_Dialog_Close></Auth0_Dialog_Close>
	{#if $auth0_login_opened}
		<Auth0_Login_Form {...$$props}></Auth0_Login_Form>
	{:else if $auth0_signup_opened}
		<Auth0_Signup_Form {...$$props}>
			<div slot="tos__signup"></div>
		</Auth0_Signup_Form>
	{:else if $auth0_forgot_password_opened}
		<Auth0_Forgot_Password_Form {...$$props}></Auth0_Forgot_Password_Form>
	{:else if $auth0_forgot_password_check_email_opened}
		<Auth0_Forgot_Password_Check_Email_Form></Auth0_Forgot_Password_Check_Email_Form>
	{:else if $auth0_change_password_opened}
		<Auth0_Change_Password_Form {...$$props}></Auth0_Change_Password_Form>
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
