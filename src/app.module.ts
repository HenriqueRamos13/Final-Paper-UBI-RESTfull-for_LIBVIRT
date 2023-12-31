import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MachinesModule } from './machines/machines.module';

@Module({
  imports: [MachinesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
