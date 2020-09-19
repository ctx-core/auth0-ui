export declare function onMount__auth0(root: any): Promise<void>;
export declare function _onMount__auth0(root: any): () => Promise<void>;
export declare function __close(event: any): Promise<void>;
export interface Ctx__submit__signup {
    email__signup: HTMLInputElement;
    password__signup: HTMLInputElement;
    password_confirmation__signup: HTMLInputElement;
}
export declare function __submit__signup(event: Event, ctx: Ctx__submit__signup, schedule__clear__forms?: () => void): Promise<false | undefined>;
export interface Ctx__submit__login {
    username__login: HTMLInputElement;
    password__login: HTMLInputElement;
}
export declare function __submit__login(event: Event, ctx: Ctx__submit__login, schedule__clear__forms?: () => void): void;
export interface Ctx__submit__forgot_password {
    email__forgot_password: HTMLInputElement;
}
export declare function __submit__forgot_password(event: Event, ctx: Ctx__submit__forgot_password): Promise<void>;
export interface Ctx__submit__signup {
    password__change_password: HTMLInputElement;
    password_confirmation__change_password: HTMLInputElement;
}
export declare function __submit__change_password(event: Event, ctx: any, schedule__clear__forms?: () => void): Promise<void>;
export declare function _schedule__clear__forms(root: any): () => void;
export declare function schedule__clear__forms(root: any): void;
