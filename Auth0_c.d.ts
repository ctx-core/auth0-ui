import { $auth0_token_json_type, $auth0_opened_class_type, password_realm_body_type, post_auth0_passwordless_start_optional_body_type, signup_data_type, login_data_type, $auth0_token_error_type } from '@ctx-core/auth0';
export declare class Auth0_c {
    protected ctx: object;
    readonly _auth0_body: import("@ctx-core/auth0")._auth0_body_type<post_auth0_passwordless_start_optional_body_type, import("@ctx-core/auth0").auth0_client_id_body_type>;
    readonly _login_password_realm_body: import("@ctx-core/auth0")._password_realm_body_type<login_data_password_realm_body_type>;
    readonly _signup_password_realm_body: import("@ctx-core/auth0")._password_realm_body_type<signup_data_password_realm_body_type>;
    readonly auth0_opened_class: import("@ctx-core/auth0").auth0_opened_class_type;
    get $auth0_opened_class(): $auth0_opened_class_type;
    readonly auth0_token_json: import("@ctx-core/auth0").auth0_token_json_type;
    get $auth0_token_json(): $auth0_token_json_type;
    set $auth0_token_json(val: $auth0_token_json_type);
    readonly auth0_token_error: import("@ctx-core/auth0").auth0_token_error_type;
    get $auth0_token_error(): $auth0_token_error_type;
    set $auth0_token_error(val: $auth0_token_error_type);
    readonly clear_auth0_token_error: import("@ctx-core/auth0").clear_auth0_token_error_type;
    readonly close_auth0: import("@ctx-core/auth0").close_auth0_type;
    readonly logout_auth0_token_error: import("@ctx-core/auth0").logout_auth0_token_error_type;
    readonly open_auth0_login: import("@ctx-core/auth0").open_auth0_login_type;
    readonly open_auth0_forgot_password_check_email: import("@ctx-core/auth0").open_auth0_forgot_password_check_email_type;
    readonly post_auth0_dbconnections_signup: import("@ctx-core/auth0").post_auth0_dbconnections_signup_type;
    readonly post_auth0_oauth_token: (body: import("@ctx-core/auth0").post_auth0_oauth_token_body_type) => any;
    readonly post_auth0_auth_change_password: import("@ctx-core/auth0").post_auth0_auth_change_password_type;
    readonly post_auth0_passwordless_start: import("@ctx-core/auth0").post_auth0_passwordless_start_type;
    constructor(ctx: object);
    onMount: (root: any) => Promise<void>;
    login: (data: login_data_type, schedule_forms_clear?: () => void) => Promise<void>;
    signup: (data: signup_data_type, schedule_forms_clear?: () => void) => Promise<void>;
    change_password: (form: any, schedule_forms_clear?: () => void) => Promise<void>;
    _schedule_forms_clear: (root: HTMLElement) => () => void;
    schedule_forms_clear: (root: HTMLElement) => void;
    onsubmit_signup: (event: Event, ctx: onsubmit_signup_ctx_I, schedule_forms_clear?: () => void) => Promise<false | undefined>;
    onsubmit_login: (event: Event, ctx: onsubmit_login_ctx_I, schedule_forms_clear?: () => void) => Promise<void>;
    onsubmit_forgot_password: (event: Event, ctx: onsubmit_forgot_password_ctx_I) => Promise<void>;
    onsubmit_change_password: (event: Event, ctx: onsubmit_change_password_ctx_I, schedule_forms_clear?: () => void) => Promise<void>;
    onclose: (event: MouseEvent) => Promise<void>;
}
export interface signup_data_password_realm_body_type extends signup_data_type, password_realm_body_type {
}
export interface login_data_password_realm_body_type extends login_data_type, password_realm_body_type {
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
