import { assert } from 'chai';
import { AuthUserService } from "./auth-user.service";

describe('AuthService', () => {
  it('should be created', () => {
    assert.isNotNull(new AuthUserService(null as any));
  })
});
