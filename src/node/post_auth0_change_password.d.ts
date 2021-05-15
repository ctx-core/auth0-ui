import type { Request, Response } from 'express';
export declare function post_auth0_change_password(req: Request, res: Response): Promise<void>;
export interface post_auth0_change_password_body_type {
    password: string;
}
export { post_auth0_change_password as post__change_password__auth0 };
