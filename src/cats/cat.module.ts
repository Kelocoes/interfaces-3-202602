import { Module } from '@nestjs/common';
import { CatService } from './cat.service';
import { CatController } from './cat.controller';

@Module({
    controllers: [CatController],
    providers: [CatService],
})
export class CatModule {}
