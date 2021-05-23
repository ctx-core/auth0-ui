import type { jwt_token_decoded_I } from '@ctx-core/auth0';
import type { auth0_ui_Ctx } from '../auth0_ui_Ctx';
export declare const _koa_jwt_token_decoded_b: import("@ctx-core/object").Be<auth0_ui_Ctx, "_koa_jwt_token_decoded", _koa_jwt_token_decoded_T>;
export declare type _koa_jwt_token_decoded_T = (authorization: string | undefined) => Promise<jwt_token_decoded_I>;
