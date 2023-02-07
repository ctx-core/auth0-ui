<script lang="ts">
import { CloseDialogHandle } from '@ctx-core/dialog-ui-svelte'
import { auth0__ui__o__getContext } from '../auth0__ui__o__getContext.js'
import { Auth0_c } from './Auth0_c.js'
const ctx = auth0__ui__o__getContext()
const _ = new Auth0_c(ctx)
</script>

<CloseDialogHandle on:click={_.onclose}></CloseDialogHandle>
