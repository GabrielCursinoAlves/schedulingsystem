export class MockFetchResend {
  private orginalFetch = globalThis.fetch;

  constructor(private statusCode?: number) { }

  fetch = async (input: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
    if(this.statusCode) {
      const errorBodies: Record<number, object> = {
        429: { 
          message: "Too Many Requests", 
          name: "rate_limit_exceeded",
          statusCode: 429 
        },
        500: { 
          message: "Internal Server Error", 
          name: "application_error",
          statusCode: 500 
        },
        502: { 
          message: "Bad Gateway", 
          name: "bad_gateway", 
          statusCode: 502 
        },
        503: { 
          message: "Service Unavailable", 
          name: "service_unavailable",
          statusCode: 503 
        },
        504: { 
          message: "Gateway Timeout", 
          name: "gateway_timeout", 
          statusCode: 504 
        },
      }

      const body = errorBodies[this.statusCode] ?? { message: "Error simulated" };

      return new Response(JSON.stringify(body), {
        status: this.statusCode,
        headers: { "Content-Type": "application/json" },
      });
    }

    return this.orginalFetch(input, init);
  }

  install() {
    globalThis.fetch = this.fetch;
  }

  restore() {
    globalThis.fetch = this.orginalFetch;
  }

}