import { B } from '@ctx-core/object';
import type { auth0_ui_Ctx } from '../auth0_ui_Ctx';
declare const key = "_verify_jwt_user_id";
export declare const _verify_jwt_user_id_b: B<auth0_ui_Ctx, typeof key>;
export declare type _verify_jwt_user_id_T = (authorization: string) => Promise<string>;
export {};
