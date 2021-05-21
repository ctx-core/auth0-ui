import { password_realm_body_T, post_auth0_passwordless_start_optional_body_T, signup_data_I, login_data_I, auth0_grant_type_body_I, post_auth0_oauth_token_body_I } from '@ctx-core/auth0';
export declare class Auth0_c {
    protected ctx: object;
    readonly _auth0_body: import("@ctx-core/auth0")._auth0_body_T<post_auth0_passwordless_start_optional_body_T, import("@ctx-core/auth0").auth0_client_id_body_I>;
    readonly _login_password_realm_body: import("@ctx-core/auth0")._password_realm_body_T<login_data_password_realm_body_I>;
    readonly _signup_password_realm_body: import("@ctx-core/auth0")._password_realm_body_T<signup_data_password_realm_body_I>;
    readonly auth0_opened_class: import("@ctx-core/auth0").auth0_opened_class_T;
    readonly auth0_token_json: import("@ctx-core/auth0").auth0_token_json_T;
    readonly auth0_token_error: import("@ctx-core/auth0").auth0_token_error_T;
    readonly clear_auth0_token_error: import("@ctx-core/auth0").clear_auth0_token_error_T;
    readonly close_auth0: import("@ctx-core/auth0").close_auth0_T;
    readonly logout_auth0_token_error: import("@ctx-core/auth0").logout_auth0_token_error_T;
    readonly open_auth0_login: import("@ctx-core/auth0").open_auth0_login_T;
    readonly open_auth0_forgot_password_check_email: import("@ctx-core/auth0").open_auth0_forgot_password_check_email_T;
    readonly post_auth0_dbconnections_signup: import("@ctx-core/auth0").post_auth0_dbconnections_signup_T;
    readonly post_auth0_oauth_token: import("@ctx-core/auth0").post_auth0_oauth_token_T;
    readonly post_auth0_auth_change_password: import("@ctx-core/auth0").post_auth0_auth_change_password_T;
    readonly post_auth0_passwordless_start: import("@ctx-core/auth0").post_auth0_passwordless_start_T;
    constructor(ctx: object);
    onMount: (root: HTMLElement) => Promise<void>;
    login: (data: login_data_I, schedule_forms_clear?: () => void) => Promise<void>;
    signup: (data: signup_data_I, schedule_forms_clear?: () => void) => Promise<void>;
    change_password: (form: {
        password: string;
    }, schedule_forms_clear?: () => void) => Promise<void>;
    _schedule_forms_clear: (root: HTMLElement) => () => void;
    schedule_forms_clear: (root: HTMLElement) => void;
    onsubmit_signup: (event: Event, ctx: onsubmit_signup_ctx_I, schedule_forms_clear?: () => void) => Promise<false | undefined>;
    onsubmit_login: (event: Event, ctx: onsubmit_login_ctx_I, schedule_forms_clear?: () => void) => Promise<void>;
    onsubmit_forgot_password: (event: Event, ctx: onsubmit_forgot_password_ctx_I) => Promise<void>;
    onsubmit_change_password: (event: Event, ctx: onsubmit_change_password_ctx_I, schedule_forms_clear?: () => void) => Promise<void>;
    onclose: (event: MouseEvent) => Promise<void>;
}
export interface signup_data_password_realm_body_I extends signup_data_I, password_realm_body_T, auth0_grant_type_body_I, post_auth0_oauth_token_body_I {
}
export interface login_data_password_realm_body_I extends login_data_I, password_realm_body_T, auth0_grant_type_body_I, post_auth0_oauth_token_body_I {
}
export interface onsubmit_change_password_ctx_I {
    password_input: HTMLInputElement;
    password_confirmation_input: HTMLInputElement;
}
export interface onsubmit_forgot_password_ctx_I {
    email_input: HTMLInputElement;
}
export interface onsubmit_login_ctx_I {
    username_login_input: HTMLInputElement;
    password_login_input: HTMLInputElement;
}
export interface onsubmit_signup_ctx_I {
    email_input: HTMLInputElement;
    password_input: HTMLInputElement;
    password_confirmation_input: HTMLInputElement;
}
