import { Injectable } from '@nestjs/common';
import { CreatePromptDto } from './dto/create-prompt.dto';
import { UpdatePromptDto } from './dto/update-prompt.dto';
import { spawn, SpawnOptions } from 'child_process';

@Injectable()
export class PromptsService {
  async create(createPromptDto: CreatePromptDto) {
    const command = createPromptDto.command;

    const options: SpawnOptions = {
      stdio: ['pipe', 'pipe', 'pipe'], // Redireciona stdin, stdout e stderr para pipes.
      shell: true, // Use o shell para interpretar comandos.
    };

    const child = spawn(command, [], options);

    // Aguarde a saída do comando.
    const outputPromise = new Promise<string | null>((resolve, reject) => {
      let output = '';
      child.stdout.on('data', (data) => {
        output += data.toString();
      });

      child.stderr.on('data', (data) => {
        output += data.toString();
      });

      child.on('exit', (code) => {
        resolve(output);
      });

      // Envie o comando para o shell.
      child.stdin.write(`${command}\n`);
      child.stdin.end();
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
