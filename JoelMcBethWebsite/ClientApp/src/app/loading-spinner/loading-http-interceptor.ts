import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { LoadingService } from "./loading.service";

@Injectable({
    providedIn: "root"
})
export class LoadingHttpInterceptor implements HttpInterceptor {
    private requests: HttpRequest<any>[] = [];

    constructor(private readonly loadingService: LoadingService) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.requests.push(req);

        this.loadingService.load();

        return Observable.create(observer => {
            const subsription = next.handle(req)
                .subscribe(
                    event => {
                        if (event instanceof HttpResponse) {
                            this.removeRequest(req);
                            observer.next(event);
                        }
                    },
                    err => {
                        this.removeRequest(req);
                        observer.error(err);
                    },
                    () => {
                        this.removeRequest(req);
                        observer.complete();
                    }
            );

            return () => {
                this.removeRequest(req);
                subsription.unsubscribe();
            }
        });
    }

    private removeRequest(req: HttpRequest<any>) {
        const i = this.requests.indexOf(req);
        if (i >= 0) {
            this.requests.splice(i, 1);
            this.loadingService.complete();
        }        
    }

}
