import { Controller, Get } from '@nestjs/common';

type AppControllerResponse = {
  status: string;
  code: 200;
};

@Controller()
export class AppController {
  @Get()
  getHealth(): AppControllerResponse {
    return {
      status: 'Healthy',
      code: 200,
    };
  }
}
