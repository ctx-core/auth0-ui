<script lang="ts">
import { is_auth0_loggedin$_b, is_auth0_loggedout$_b, } from '@ctx-core/auth0'
import type { auth0_ui_Ctx } from '../auth0_ui_Ctx.js'
import { getContext_auth0_ui_ctx } from '../getContext_auth0_ui_ctx.js'
const ctx = getContext_auth0_ui_ctx() as auth0_ui_Ctx
const is_auth0_loggedin$ = is_auth0_loggedin$_b(ctx)
const is_auth0_loggedout$ = is_auth0_loggedout$_b(ctx)
</script>

{#if $is_auth0_loggedin$}
	<slot name="loggedin"><slot></slot></slot>
{:else if $is_auth0_loggedout$}
	<slot name="loggedout"></slot>
{/if}
