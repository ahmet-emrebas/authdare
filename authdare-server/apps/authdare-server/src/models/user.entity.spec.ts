import { UserEntity } from './user.entity';
describe('UserEntity', () => {

    it('should be created', () => {
        expect(new UserEntity()).not.toBeNull();
    })

});