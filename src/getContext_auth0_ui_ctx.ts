import { getContext } from 'svelte'
import { auth0_ui_ctx_key } from './auth0_ui_ctx_key.js'
export function getContext_auth0_ui_ctx() {
  return getContext(auth0_ui_ctx_key)
}
