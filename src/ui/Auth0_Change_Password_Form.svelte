<script lang="ts">
import { createEventDispatcher } from 'svelte'
import { AUTH0_DOMAIN$_b, auth0_token_error$_b } from '@ctx-core/auth0'
import { getContext_auth0_ui_ctx } from '../browser'
import type { auth0_ui_Ctx } from '../auth0_ui_Ctx'
import Auth0_Dialog_Close from './Auth0_Dialog_Close.svelte'
import { Auth0_c } from './Auth0_c'
const ctx = getContext_auth0_ui_ctx() as auth0_ui_Ctx
const dispatch = createEventDispatcher()
export let error_class = ''
export let input_class = ''
export let button_class = ''
export let label_class = ''
const AUTH0_DOMAIN$ = AUTH0_DOMAIN$_b(ctx)
const auth0_token_error$ = auth0_token_error$_b(ctx)
const _ = new Auth0_c(ctx)
let root
let password_input
let password_confirmation_input
let password_error //region
$: password_error =
	$auth0_token_error$
	&& $auth0_token_error$.password //endregion
let password_error_confirmation //region
$: password_error_confirmation =
	$auth0_token_error$
	&& $auth0_token_error$.password_confirmation //endregion
async function in_onsubmit_change_password(event) {
	dispatch('submit__start')
	try {
		await _.onsubmit_change_password(event, {
			password_input,
			password_confirmation_input,
		}, _._schedule_forms_clear(root))
		dispatch('success')
	} catch (error) {
		dispatch('error', { error })
		throw error
	} finally {
		dispatch('submit__end')
	}
}
</script>

<div bind:this="{root}" class="form change_password Auth0_Change_Password_Form">
	<Auth0_Dialog_Close></Auth0_Dialog_Close>
	<h1>Change Password</h1>
	<form
		action="https://{$AUTH0_DOMAIN$}/dbconnections/change_password"
		accept-charset="UTF-8"
		method="post"
		on:submit|preventDefault="{in_onsubmit_change_password}"
	>
		{#if $auth0_token_error$}
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
			<div class="{label_class}">Password</div>
			<input
				bind:this={password_input}
				placeholder="**********"
				required="required"
				class="{input_class}"
				class:invalid="{password_error}"
				id="password-change_password"
				type="password"
				name="password"/>
		</label>
		<label class="field">
			<div class="{label_class}">Confirm Password</div>
			<input
				bind:this={password_confirmation_input}
				type="password"
				id="password_confirmation-change_password"
				name="password_confirmation"
				class="{input_class}"
				class:invalid="{password_error_confirmation}"
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
