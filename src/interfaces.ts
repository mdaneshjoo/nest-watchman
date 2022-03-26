import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios';
export interface WatchmanOptionsInterface {
  url: string;
  webHookProvider: WebHookProviderEnum.discord | WebHookProviderEnum.email;
}
export enum WebHookProviderEnum {
  discord = 'DISCORD',
  email = 'EMAIL',
}
export interface BaseServiceInterface {
  post(
    url: string,
    data: PostBodyDataInterface,
  ): Observable<AxiosResponse>;
}

export interface DiscordBodyInterface {
  /**
   * @description the message contents (up to 2000 characters)
   */
  content: string;

  /**
   * @description override the default username of the webhook
   */
  username?: string;

  /**
   * @description override the default avatar of the webhook
   */
  avatar_url?: string;

  /**
   * @description true if this is a TTS message
   */
  tts?: boolean;

  /**
   * @description embedded rich content
   * @type  array of up to 10 embed objects
   * @see {@link https://discord.com/developers/docs/resources/channel#embed-object}
   */
  embeds?: Array<any>;

  /**
   * @description allowed mentions for the message
   * @type  allowed mention object
   * @see {@link https://discord.com/developers/docs/resources/channel#allowed-mentions-objectallowed }
   */
  allowed_mentions?: string;

  /**
   * @description the components to include with the message
   * @type  array of message component
   * @see {@link https://discord.com/developers/docs/interactions/message-components#component-objectmessage }
   */
  components?: Array<string>;

  /**
   * @description the contents of the file being sent
   * @type  file contents
   */
  files?: any;

  /**
   * @description JSON encoded body of non-file params
   */
  payload_json?: string;

  /**
   * @description attachment objects with filename and description
   * @type  array of partial attachment objects
   * @see {@link https://discord.com/developers/docs/resources/channel#attachment-objectattachment}
   */
  attachments?: any;
}

export interface PostBodyDataInterface{
  errorCode: string;
  message: string;
  errType: 'INTERNAL_SERVER_ERROR' | 'HTTP_EXCEPTION';
  path?: string;
}