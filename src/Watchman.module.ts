import { DiscordService } from './discord/discord.service';
import { HttpModule } from '@nestjs/axios';
import { DynamicModule, Module, Provider } from '@nestjs/common';
import { DiscordModule } from './discord/discord.module';
import { WatchmanService } from './Watchman.service';
import { WatchmanOptionsInterface } from './interfaces';

const WatchmanServiceFactory = (
  option: Partial<WatchmanOptionsInterface>,
): Provider<any> => {
  return {
    provide: WatchmanService,
    useFactory: (discord: DiscordService) => {
      return new WatchmanService(option, discord);
    },
    inject: [DiscordService],
  };
};

@Module({})
export class WatchmanModule {
  static forRoot(option: WatchmanOptionsInterface): DynamicModule {
    const providers: Provider<any>[] = [WatchmanServiceFactory(option)];
    return {
      providers: providers,
      exports: providers,
      module: WatchmanModule,
      imports: [DiscordModule, HttpModule],
    };
  }
}
