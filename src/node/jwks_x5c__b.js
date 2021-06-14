import { be_ } from '@ctx-core/object';
import { throw__response__fetch } from '@ctx-core/fetch';
import { get_jwks_json_b } from '@ctx-core/auth0';
const key = 'jwks_x5c_';
export const jwks_x5c__b = be_(key, ctx => {
    const get_jwks_json = get_jwks_json_b(ctx);
    return jwks_x5c_;
    async function jwks_x5c_() {
        const response = await get_jwks_json();
        if (!response.ok) {
            await throw__response__fetch(response);
        }
        const jwks_json = await response.json();
        const { keys } = jwks_json;
        const key = keys[0];
        const { x5c } = key;
        return x5c;
    }
});
//# sourceMappingURL=../src/node/jwks_x5c__b.js.map