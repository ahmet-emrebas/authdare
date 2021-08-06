import { assert } from 'chai';
import { UserService } from "./services/user.service";

describe('AuthService', () => {
  it('should be created', () => {
    assert.isNotNull(new UserService(null as any));
  })
});
