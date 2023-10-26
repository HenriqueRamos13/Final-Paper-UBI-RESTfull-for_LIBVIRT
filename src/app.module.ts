import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MachinesModule } from './machines/machines.module';
import { PromptsModule } from './prompts/prompts.module';

@Module({
  imports: [MachinesModule, PromptsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
