<script lang="ts">
import { CloseDialogHandle } from '@ctx-core/dialog'
import { Auth0_c } from './Auth0_c.js'
import { getContext_auth0_ui_ctx } from '../getContext_auth0_ui_ctx.js'
import type { auth0_ui_Ctx } from '../auth0_ui_Ctx'
const ctx = getContext_auth0_ui_ctx() as auth0_ui_Ctx
const _ = new Auth0_c(ctx)
</script>

<CloseDialogHandle on:click={_.onclose}></CloseDialogHandle>
