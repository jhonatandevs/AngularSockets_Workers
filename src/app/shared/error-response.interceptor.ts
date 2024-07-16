import { HttpErrorResponse, HttpInterceptorFn } from "@angular/common/http"
import { catchError, throwError } from "rxjs"

export const ErrorResponseInterceptor:HttpInterceptorFn = (req,next) =>
{    
    console.log("Checkpoint 1:  ",req) ;
    return next(req).pipe(catchError(handleErrorResponse))
}
function handleErrorResponse(error: HttpErrorResponse){
    console.log("Entrando a error custom")
    //Controlar el error recibido
    const errorResponse=`Error Este es un error redactado custom ${JSON.stringify(error)}`
    return throwError(()=>errorResponse)
}