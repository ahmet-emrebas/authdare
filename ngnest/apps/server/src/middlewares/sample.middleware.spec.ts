import { SampleMiddleware } from './sample.middleware';

describe('SampleMiddleware', () => {
  it('should be defined', () => {
    expect(new SampleMiddleware()).toBeDefined();
  });
});
