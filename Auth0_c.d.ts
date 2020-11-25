import { $auth0_token_error_type, $auth0_token_json_type } from '@ctx-core/auth0';
export declare class Auth0_c {
    protected ctx: object;
    readonly _auth0_body: (...form: any[]) => any;
    readonly _password_realm_body: (...form: any[]) => any;
    readonly auth0_opened_class: import("@ctx-core/auth0").auth0_opened_class_type;
    get $auth0_opened_class(): $auth0_token_json_type;
    readonly auth0_token_json: import("@ctx-core/auth0").auth0_token_json_type;
    get $auth0_token_json(): $auth0_token_json_type;
    set $auth0_token_json(val: $auth0_token_json_type);
    readonly auth0_token_error: import("@ctx-core/auth0").auth0_token_error_type;
    get $auth0_token_error(): $auth0_token_error_type;
    set $auth0_token_error(val: $auth0_token_error_type);
    readonly clear_auth0_token_error: () => void;
    readonly close_auth0: () => void;
    readonly logout_auth0_token_error: (error: any) => void;
    readonly open_auth0_login: () => void;
    readonly open_auth0_forgot_password_check_email: () => void;
    readonly post_auth0_dbconnections_signup: (body: any) => any;
    readonly post_auth0_oauth_token: (body: any) => any;
    readonly post_auth0_auth_change_password: (password: any) => Promise<any>;
    readonly post_auth0_passwordless_start: (body: any) => any;
    constructor(ctx: object);
    onMount: (root: any) => Promise<void>;
    login: (form: any, schedule_forms_clear?: () => void) => Promise<void>;
    signup: (form: any, schedule_forms_clear?: () => void) => Promise<void>;
    change_password: (form: any, schedule_forms_clear?: () => void) => Promise<void>;
    _schedule_forms_clear: (root: HTMLElement) => () => void;
    schedule_forms_clear: (root: HTMLElement) => void;
    onsubmit_signup: (event: Event, ctx: onsubmit_signup_ctx_I, schedule_forms_clear?: () => void) => Promise<false | undefined>;
    onsubmit_login: (event: Event, ctx: onsubmit_login_ctx_I, schedule_forms_clear?: () => void) => Promise<void>;
    onsubmit_forgot_password: (event: Event, ctx: onsubmit_forgot_password_ctx_I) => Promise<void>;
    onsubmit_change_password: (event: Event, ctx: onsubmit_change_password_ctx_I, schedule_forms_clear?: () => void) => Promise<void>;
    onclose: (event: MouseEvent) => Promise<void>;
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
