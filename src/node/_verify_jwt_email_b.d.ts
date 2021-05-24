import { B } from '@ctx-core/object';
import type { auth0_ui_Ctx } from '../auth0_ui_Ctx';
declare const key = "_verify_jwt_email";
export declare const _verify_jwt_email_b: B<auth0_ui_Ctx, typeof key>;
export declare type _verify_jwt_email_T = (authorization: string) => Promise<string>;
export {};
