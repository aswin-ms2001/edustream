import { type HttpRequest,type HttpResponse } from "@/application/interfaces/Http";

export class TestController {
  async handle(
    request: HttpRequest
  ): Promise<HttpResponse> {
    return {
      statusCode: 200,
      body: {
        success: true,
        message: "Clean Architecture Working",
      },
    };
  }
}