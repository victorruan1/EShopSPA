import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';

const SUBSCRIPTION_KEY = '4ef6470b0bc6463f8fb00036dedc3aaf';
const HEADER_NAME = 'Ocp-Apim-Subscription-Key';
const QUERY_NAME = 'subscription-key';

@Injectable()
export class ApimKeyInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Add key for calls to the Azure API Gateway hosts (prod + dev portal)
    const isGateway =
      req.url.includes('apigatewayeshop.azure-api.net') ||
      req.url.includes('apigatewayeshop.developer.azure-api.net');
    // Also support local dev proxy path
    const isDevProxy = req.url.startsWith('/apigw');

    if (isGateway) {
      // Direct call to APIM hosts: add both header & query param
      const headers = req.headers.set(HEADER_NAME, SUBSCRIPTION_KEY);
      const params = req.params.set(QUERY_NAME, SUBSCRIPTION_KEY);
      return next.handle(req.clone({ headers, params }));
    }

    if (isDevProxy) {
      // Via dev proxy: header is added by proxy; append query param only
      const params = req.params.set(QUERY_NAME, SUBSCRIPTION_KEY);
      return next.handle(req.clone({ params }));
    }

    return next.handle(req);
  }
}
