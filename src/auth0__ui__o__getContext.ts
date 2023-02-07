import { getContext } from 'svelte'
import type { Ctx } from '@ctx-core/object'
import { auth0__ui__o_key } from './auth0__ui__o_key.js'
export function auth0__ui__o__getContext() {
  return getContext(auth0__ui__o_key) as Ctx
}
