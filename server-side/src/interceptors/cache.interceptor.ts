import { CallHandler, ExecutionContext, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { PostGalleryTypeImageTypeResponseType } from "src/cloudStorage/dtos";

@Injectable()
export class CacheHeaderInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<PostGalleryTypeImageTypeResponseType> {
        const response = context.switchToHttp().getResponse();
        response.setHeader('Cache-Control', 'private, max-age=3600');
        return next.handle();
    }
}