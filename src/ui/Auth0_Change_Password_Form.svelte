<script lang="ts">
import { createEventDispatcher } from 'svelte'
import { AUTH0_DOMAIN__, auth0__token__error__ } from '@ctx-core/auth0'
import { auth0__ui__o__getContext } from '../auth0__ui__o__getContext.js'
import { Auth0_c } from './Auth0_c.js'
import Auth0_Dialog_Close from './Auth0_Dialog_Close.svelte'
const ctx = auth0__ui__o__getContext()
const dispatch = createEventDispatcher()
export let error_class = '', input_class = '', button_class = '', label_class = '.js'
const AUTH0_DOMAIN_ = AUTH0_DOMAIN__(ctx)
const auth0__token__error_ = auth0__token__error__(ctx)
const _ = new Auth0_c(ctx)
let root:HTMLDivElement
let password_input:HTMLInputElement
let password_confirmation_input
let password_error:any|undefined //region
$: password_error = $auth0_token_error_?.password //endregion
let password_error_confirmation:string|undefined //region
$: password_error_confirmation = $auth0_token_error_?.password_confirmation //endregion
async function change_password__onsubmit(event:FormDataEvent) {
	dispatch('submit__start')
	try {
		await _.change_password__onsubmit(event, {
			password_input,
			password_confirmation_input,
		}, ()=>_.forms__clear__schedule(root))
		dispatch('success')
	} catch (error) {
		dispatch('error', { error })
		throw error
	} finally {
		dispatch('submit__end')
	}
}
</script>

<div bind:this={root} class="form change_password Auth0_Change_Password_Form">
	<Auth0_Dialog_Close></Auth0_Dialog_Close>
	<h1>Change Password</h1>
	<form
		action="https://{$AUTH0_DOMAIN_}/dbconnections/change_password"
		accept-charset="UTF-8"
		method="post"
		on:submit|preventDefault={change_password__onsubmit}
	>
		{#if $auth0_token_error_}
			<ul>
				{#if password_error}
					<li class="error {error_class}">
						{password_error}
					</li>
				{/if}
				{#if password_error_confirmation}
					<li class="error {error_class}">
						{password_error_confirmation}
					</li>
				{/if}
			</ul>
		{/if}
		<fieldset>
		<label class="field">
			<div class={label_class}>Password</div>
			<input
				bind:this={password_input}
				placeholder="**********"
				required="required"
				class={input_class}
				class:invalid={password_error}
				id="password-change_password"
				type="password"
				name="password"/>
		</label>
		<label class="field">
			<div class={label_class}>Confirm Password</div>
			<input
				bind:this={password_confirmation_input}
				type="password"
				id="password_confirmation-change_password"
				name="password_confirmation"
				class={input_class}
				class:invalid={password_error_confirmation}
				required="required"
				placeholder="**********"
			/>
		</label>
		</fieldset>
		<footer>
			<input type="submit" value="Change Password" class="button {button_class}"/>
		</footer>
	</form>
</div>
