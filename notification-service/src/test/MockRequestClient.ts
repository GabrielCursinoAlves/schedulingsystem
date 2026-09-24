import type { RequestOptions } from "twilio/lib/base/RequestClient.js";
import RequestClient from "twilio/lib/base/RequestClient.js";

export class MockRequestClient extends  RequestClient {

  constructor(private forcedStatusCode?: number) { super(); }

  async request<TData>(opts: RequestOptions<TData, object>) {
    if (this.forcedStatusCode) {
      const errorBodies: Record<number, object> = {
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
        502: {
          code: 20502,
          message: "Bad Gateway",
          more_info: "https://www.twilio.com/docs/errors/20502",
          status: 502,
        },
        503: {
          code: 20503,
          message: "Service Unavailable",
          more_info: "https://www.twilio.com/docs/errors/20503",
          status: 503,
        },
        504: {
          code: 20504,
          message: "Gateway Timeout",
          more_info: "https://www.twilio.com/docs/errors/20504",
          status: 504,
        }
      };

      const body = errorBodies[this.forcedStatusCode] ?? { message: "Error simulated" };

      return {
        statusCode: this.forcedStatusCode,
        body,
      } as any;
    }

    return super.request(opts);
  }
}