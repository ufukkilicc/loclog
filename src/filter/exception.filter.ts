import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { ApiResponse } from 'src/interfaces/response.interface';

@Catch()
export class ExceptionsFilter implements ExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();

        let status = HttpStatus.INTERNAL_SERVER_ERROR;
        let message = 'Internal server error';

        if (exception instanceof HttpException) {
            status = exception.getStatus();
            message = exception.getResponse() as string;
        } else if (exception instanceof Error) {
            message = exception.message;
        }

        const errorResponse: ApiResponse<null> = {
            success: false,
            error: message,
        };

        response.status(status).json(errorResponse);
    }
}