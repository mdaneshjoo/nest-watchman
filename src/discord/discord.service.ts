import {
  BaseServiceInterface,
  DiscordBodyInterface,
  PostBodyDataInterface,
} from './../interfaces';
import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios';

@Injectable()
export class DiscordService implements BaseServiceInterface {
  constructor(private readonly http: HttpService) {}

  post(url: string, data: PostBodyDataInterface): Observable<AxiosResponse> {
    return this.http.post(url, {
      content: ` you have an error of type ${data.errType} with error code ${data.errorCode}
      message is: ${data.message}
      on this path: ${data.path}
      `,
    } as DiscordBodyInterface);
  }
}
