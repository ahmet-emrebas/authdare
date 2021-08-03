import { assert } from 'chai';
import { AuthService } from "./auth.service";

describe('AuthService', () => {
  it('should be created', () => {
    assert.isNotNull(new AuthService());
  })
});
