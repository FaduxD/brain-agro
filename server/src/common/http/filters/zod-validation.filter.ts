import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
} from "@nestjs/common";

@Catch(BadRequestException)
export class ZodValidationFilter implements ExceptionFilter {
  catch(exception: BadRequestException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    const errorResponse = exception.getResponse();

    if (errorResponse && typeof errorResponse === "object") {
      const errors = (errorResponse as any).errors;

      if (errors && Array.isArray(errors)) {
        const zodError = errors[0] as any;
        const field = zodError.path.join(".");
        const errorMessage = zodError.message;

        const customMessage = `${field} ${errorMessage}`;

        return response.status(400).json({
          ...errorResponse,
          message: customMessage,
          zodErrors: zodError.errors,
        });
      }
    }

    response.status(400).json(errorResponse);
  }
}
