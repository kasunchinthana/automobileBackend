import { Catch, ExceptionFilter, HttpException, ArgumentsHost, HttpStatus, Logger } from "@nestjs/common";

@Catch()
export class HttpErrorFilter implements ExceptionFilter{

    catch(exception: HttpException,host: ArgumentsHost){
        const ctx =host.switchToHttp();
        const request = ctx.getRequest();
        const response = ctx.getResponse();
        const status = exception.getStatus();
    
        const errorResponse ={
            code: status,
            timestamp: new Date().toLocaleDateString(),
            path: request.url,
            method: request.method,
            message: exception.message || exception.message || null,
        }
        if (status === HttpStatus.INTERNAL_SERVER_ERROR) {
            Logger.error(
              `${request.method} ${request.url}`,
              exception.stack,
              'ExceptionFilter',
            );
          } else {
            Logger.error(
              `${request.method} ${request.url}`,
              JSON.stringify(errorResponse),
              'ExceptionFilter',
            );
          }
      
          response.status(status).json(errorResponse);
    }
}