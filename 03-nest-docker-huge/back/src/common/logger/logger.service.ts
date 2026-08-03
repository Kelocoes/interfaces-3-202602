import { Injectable, LoggerService } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class AppLogger implements LoggerService {
    private logStream: fs.WriteStream;

    constructor() {
        const timestamp = new Date().toISOString().split('T')[0];
        const logDir = path.join(process.cwd(), 'logs');

        console.log('Log directory:', logDir);

        if (!fs.existsSync(logDir)) {
            fs.mkdirSync(logDir, { recursive: true });
        }

        const logFile = path.join(logDir, `logs-${timestamp}.log`);
        console.log('Log file:', logFile);

        this.logStream = fs.createWriteStream(logFile, { flags: 'a' });
        this.write('INFO', 'Logger initialized');
    }

    log(message: string) {
        this.write('LOG', message);
    }

    error(message: string, trace?: string) {
        this.write('ERROR', message, trace);
    }

    warn(message: string) {
        this.write('WARN', message);
    }

    debug(message: string) {
        this.write('DEBUG', message);
    }

    verbose(message: string) {
        this.write('VERBOSE', message);
    }

    private write(level: string, message: string, trace?: string) {
        const log = `[${new Date().toISOString()}] [${level}] ${message}${
            trace ? '\n' + trace : ''
        }\n`;

        this.logStream.write(log);
        console.log(log.trim());
    }

    onModuleDestroy() {
        if (this.logStream) {
            this.logStream.end();
        }
    }
}
