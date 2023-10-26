import { Injectable } from '@nestjs/common';
import { CreatePromptDto } from './dto/create-prompt.dto';
import { UpdatePromptDto } from './dto/update-prompt.dto';
import { spawn } from 'node-pty';
import { cwd } from 'node:process';

@Injectable()
export class PromptsService {
  async create(createPromptDto: CreatePromptDto) {
    const command = createPromptDto.command;

    // Crie um pseudoterminal (PTY) para o comando.
    const term = spawn(command, [], {
      name: 'xterm-256color', // Nome do terminal (pode variar)
      cols: 80, // Colunas
      rows: 30, // Linhas
      cwd: cwd(), // Diretório de trabalho atual
      env: process.env, // Variáveis de ambiente
    });

    // Aguarde a saída do comando.
    const outputPromise = new Promise<string | null>((resolve, reject) => {
      let output = '';
      term.onData((data) => {
        output += data;
      });

      term.onExit(() => {
        resolve(output);
      });

      // Envie o comando para o shell.
      term.write(`${command}\r`);
    });

    const output = await outputPromise;

    // Encerre o pseudoterminal.
    term.kill();

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
