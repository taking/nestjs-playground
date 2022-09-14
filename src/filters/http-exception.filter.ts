import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { FastifyReply } from "fastify";

@Catch(HttpException)
export class HttpExceptionFilter<T extends HttpException> implements ExceptionFilter
    {
      catch(exception: T, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response: FastifyReply<any> = ctx.getResponse<FastifyReply>();
        const request = ctx.getRequest();
    
        const status =
        exception instanceof HttpException
          ? exception.getStatus()
          : HttpStatus.INTERNAL_SERVER_ERROR;
          
        const errorResponse = {
          status: status,
          timestamp: new Date().toISOString(),
          path: request.url,
          method: request.method,
          message:
            status !== HttpStatus.INTERNAL_SERVER_ERROR
              ? exception['message']['error'] || exception['message'] || null
              : 'Internal server error',
        }
        
        response
          .status(status)
          .send(errorResponse);
      }
    }