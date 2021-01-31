<script>
import Close__Dialog from '@ctx-core/dialog/Close__Dialog.svelte'
import { Auth0_c } from './Auth0_c'
import { getContext_auth0_ui_ctx } from './getContext_auth0_ui_ctx'
const ctx = getContext_auth0_ui_ctx()
const _ = new Auth0_c(ctx)
</script>

<Close__Dialog on:click={_.onclose}></Close__Dialog>
