<script>
import { Dialog_Close } from '@ctx-core/dialog'
import { Auth0_c } from './Auth0_c'
import { getContext_auth0_ui_ctx } from './getContext_auth0_ui_ctx'
const ctx = getContext_auth0_ui_ctx()
const _ = new Auth0_c(ctx)
</script>

<Dialog_Close on:click={_.onclose}></Dialog_Close>
