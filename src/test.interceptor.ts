import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

// @Injectable()
// export class TestInterceptor implements HttpInterceptor {
//   constructor() {}

//   intercept(request: HttpRequest<unknown>, next: HttpHandler) {
//     let commonUrl ="http://localhost:3000/";

//     let newRequest = request.clone({
//       url:commonUrl+request.url
//     })
//     return next.handle(newRequest);
//   }
// }
