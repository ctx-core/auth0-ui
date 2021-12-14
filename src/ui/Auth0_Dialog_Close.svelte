<script lang="ts">
import { CloseDialogHandle } from '@ctx-core/dialog-ui-svelte'
import { getContext_auth0_ui_ctx } from '../getContext_auth0_ui_ctx.js'
import { Auth0_c } from './Auth0_c.js'
const ctx = getContext_auth0_ui_ctx()
const _ = new Auth0_c(ctx)
</script>

<CloseDialogHandle on:click={_.onclose}></CloseDialogHandle>
