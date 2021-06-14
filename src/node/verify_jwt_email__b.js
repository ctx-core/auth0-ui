import { be_ } from '@ctx-core/object';
import { user_id_, validate_auth0_user } from '@ctx-core/auth0';
import { get_auth0_v2_user_b } from '@ctx-core/auth0-management';
import { koa_jwt_token_decoded__b } from './koa_jwt_token_decoded__b';
const key = 'verify_jwt_email_';
export const verify_jwt_email__b = be_(key, ctx => {
    const get_auth0_v2_user = get_auth0_v2_user_b(ctx);
    const koa_jwt_token_decoded_ = koa_jwt_token_decoded__b(ctx);
    return verify_jwt_email_;
    async function verify_jwt_email_(authorization) {
        const koajwt_token_decoded_fn = await koa_jwt_token_decoded_(authorization);
        let email = koajwt_token_decoded_fn.email;
        if (!email) {
            const user_id = user_id_(koajwt_token_decoded_fn);
            const AUTH0_DOMAIN = process.env.AUTH0_DOMAIN;
            const request_ctx = {
                AUTH0_DOMAIN,
                user_id
            };
            const response = await get_auth0_v2_user(request_ctx);
            const user = await response.json();
            validate_auth0_user(user);
            email = user.email;
        }
        return email;
    }
});
//# sourceMappingURL=../src/node/verify_jwt_email__b.js.map