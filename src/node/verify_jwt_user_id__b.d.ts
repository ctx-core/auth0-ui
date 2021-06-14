import { B } from '@ctx-core/object';
import type { auth0_ui_Ctx } from '../auth0_ui_Ctx';
declare const key = "verify_jwt_user_id_";
export declare const verify_jwt_user_id__b: B<auth0_ui_Ctx, typeof key>;
export declare type verify_jwt_user_id__T = (authorization: string) => Promise<string>;
export {};
