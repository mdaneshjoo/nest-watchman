import {
  Injectable,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { DiscordService } from './discord/discord.service';
import {
  WatchmanOptionsInterface,
  BaseServiceInterface,
  WebHookProviderEnum,
} from './interfaces';

@Injectable()
export class WatchmanService {
  [WebHookProviderEnum.discord];
  constructor(
    private options: Partial<WatchmanOptionsInterface>,
    discord: DiscordService,
  ) {
    this[WebHookProviderEnum.discord] = discord;
  }

  private get webhook() {
    const hook = <BaseServiceInterface>this[this.options.webHookProvider];
    if (!hook)
      throw new Error(
        `webhook provider (${this.options.webHookProvider}) not supported yet`,
      );
    return hook;
  }

  /**
   * @description this method sent error exeption to your webHook
   */
  watch(
    exception: any,
    host: ArgumentsHost,
    withHttpExeptions: boolean = false,
  ): void {

    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>()
    
    const status = 'getStatus' in exception ? exception.getStatus() :  HttpStatus.INTERNAL_SERVER_ERROR;
      
    if (status === HttpStatus.INTERNAL_SERVER_ERROR) {
      this.webhook
        .post(this.options.url, {
          errorCode: status.toString(),
          message: exception.message,
          errType: 'INTERNAL_SERVER_ERROR',
          path: request?.url,
        })
        .subscribe();
      return;
    }

    if(!withHttpExeptions) return;

    const exceptionData = exception.getResponse();

    this.webhook
      .post(this.options.url, {
        errorCode: exceptionData.error
          ? exceptionData.error
          : exceptionData.message,
        message: exceptionData.message,
        errType: 'HTTP_EXCEPTION',
        path: request?.url,
      })
      .subscribe();
  }
}
