import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
    BadRequestException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as crypto from 'crypto';

@Injectable()
export class CryptoInterceptor implements NestInterceptor {
    private readonly algorithm = 'aes-256-cbc';
    private readonly secretKey = Buffer.from(
        '12345678901234567890123456789012',
    ); // 32 bytes
    private readonly iv = Buffer.from('1234567890123456'); // 16 bytes

    private decrypt(encryptedText: string): unknown {
        const decipher = crypto.createDecipheriv(
            this.algorithm,
            this.secretKey,
            this.iv,
        );
        let decrypted = decipher.update(encryptedText, 'base64', 'utf8');
        decrypted += decipher.final('utf8');
        return JSON.parse(decrypted);
    }

    private encrypt(value: unknown): string {
        const cipher = crypto.createCipheriv(
            this.algorithm,
            this.secretKey,
            this.iv,
        );
        let encrypted = cipher.update(JSON.stringify(value), 'utf8', 'base64');
        encrypted += cipher.final('base64');
        return encrypted;
    }

    intercept(
        context: ExecutionContext,
        next: CallHandler,
    ): Observable<{ encrypted: string }> {
        const request = context.switchToHttp().getRequest<{ body: unknown }>();

        if (this.hasEncryptedProperty(request.body)) {
            try {
                request.body = this.decrypt(request.body.encrypted);
            } catch (e) {
                if (e instanceof Error) {
                    throw new BadRequestException(
                        'Invalid encrypted body',
                        e.message,
                    );
                }
            }
        }

        return next.handle().pipe(
            map((data: unknown) => {
                return { encrypted: this.encrypt(data) };
            }),
        );
    }

    private hasEncryptedProperty(body: unknown): body is { encrypted: string } {
        return typeof body === 'object' && body !== null && 'encrypted' in body;
    }
}
