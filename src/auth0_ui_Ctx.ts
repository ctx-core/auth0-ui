import type { auth0_body__T, auth0_Ctx, password_realm_body__T } from '@ctx-core/auth0'
import type { auth0_ui_ctx_I } from './auth0_ui_ctx_I.generated'
import type {
	login_data_password_realm_body_I, signup_data_password_realm_body_I
} from './ui/Auth0_c'
export interface auth0_ui_Ctx extends auth0_ui_ctx_I, auth0_Ctx {
	login_auth0_body_fn:auth0_body__T<login_data_password_realm_body_I>
	login_password_realm_body_fn:password_realm_body__T<login_data_password_realm_body_I>
	signup_auth0_body_fn:auth0_body__T<signup_data_password_realm_body_I>
	signup_password_realm_body_fn:password_realm_body__T<signup_data_password_realm_body_I>
}
