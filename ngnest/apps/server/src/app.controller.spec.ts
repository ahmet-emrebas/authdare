import { AppController } from './app.controller';
class AppServiceTest {
  async getHello(): Promise<string> {
    return 'hello there';
  }
  async sendHelloEmail(): Promise<any> {
    return 'message_send';
  }
}

const appService: AppServiceTest = new AppServiceTest();
const appController: AppController = new AppController(appService as any);

describe('AppController', () => {
  it('should be defined', () => {
    expect(appController).toBeDefined();
  });

  test.each`
    method        | expected                 | actual
    ${'getHello'} | ${appService.getHello()} | ${appController.getHello()}
  `('$method should return $expected', async ({ method, expected, actual }) => {
    expect(expected).toEqual(actual);
  });
});
