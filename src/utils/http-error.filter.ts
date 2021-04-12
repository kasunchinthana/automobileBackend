import { Catch, ExceptionFilter, HttpException, ArgumentsHost, HttpStatus, Logger } from "@nestjs/common";

@Catch()
export class HttpErrorFilter implements ExceptionFilter{

    catch(exception: HttpException,host: ArgumentsHost){
        const ctx =host.switchToHttp();
        const request = ctx.getRequest();
        const response = ctx.getResponse();
        const status = exception;
        console.log(request);
        console.log(request.url);
        const errorResponse ={
            code: status,
            timestamp: new Date().toLocaleDateString(),
            path: request.url,
            method: request.method,
            message: exception.message || exception.message || null,
            
            
        }
        if (exception !== null) {
            Logger.error(
              `${request.method} ${request.url}`,
              JSON.stringify(errorResponse),
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