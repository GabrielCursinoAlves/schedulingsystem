import type { RequestOptions } from "twilio/lib/base/RequestClient.js";
import RequestClient from "twilio/lib/base/RequestClient.js";

export class MockRequestClient extends  RequestClient {

  constructor(private forcedStatusCode?: number) { super(); }

  async request<TData>(opts: RequestOptions<TData, object>) {
    if (this.forcedStatusCode) {
      const errorBodies: Record<number, object> = {
        401: {
          code: 20003,
          message: "Authentication Error - No credentials provided",
          more_info: "https://www.twilio.com/docs/errors/20003",
          status: 401,
        },
        429: {
          code: 20429,
          message: "Too Many Requests",
          more_info: "https://www.twilio.com/docs/errors/20429",
          status: 429,
        },
        500: {
          code: 20500,
          message: "Internal Server Error",
          more_info: "https://www.twilio.com/docs/errors/20500",
          status: 500,
        },
        503: {
          code: 20503,
          message: "Service Unavailable",
          more_info: "https://www.twilio.com/docs/errors/20503",
          status: 503,
        },
      };

      const body = errorBodies[this.forcedStatusCode] ?? { message: "Erro simulado" };

      return {
        statusCode: this.forcedStatusCode,
        body,
      } as any;
    }

    return super.request(opts);
  }
}