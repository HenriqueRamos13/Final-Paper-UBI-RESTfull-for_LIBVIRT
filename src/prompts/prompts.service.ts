import { Injectable } from '@nestjs/common';
import { CreatePromptDto } from './dto/create-prompt.dto';
import { UpdatePromptDto } from './dto/update-prompt.dto';
import { exec } from 'child_process';

@Injectable()
export class PromptsService {
  async create(createPromptDto: CreatePromptDto) {
    const outputPromise = new Promise<string | null>((resolve, reject) => {
      exec(createPromptDto.command, (err, stdout, stderr) => {
        if (err) {
          console.log('Custom: Erro - ' + err);
          resolve(stderr);
        } else {
          resolve(stdout);
        }
      });
    });

    const output = await outputPromise;

    return { output };
  }

  findAll() {
    return `This action returns all prompts`;
  }

  findOne(id: number) {
    return `This action returns a #${id} prompt`;
  }

  update(id: number, updatePromptDto: UpdatePromptDto) {
    return `This action updates a #${id} prompt`;
  }

  remove(id: number) {
    return `This action removes a #${id} prompt`;
  }
}
