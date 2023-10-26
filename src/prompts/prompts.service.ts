import { Injectable } from '@nestjs/common';
import { CreatePromptDto } from './dto/create-prompt.dto';
import { UpdatePromptDto } from './dto/update-prompt.dto';
import { spawn } from 'child_process';

@Injectable()
export class PromptsService {
  private childProcess = null;

  async create(createPromptDto: CreatePromptDto) {
    const command = createPromptDto.command;
    const outputBuffer = [];

    if (!this.childProcess) {
      this.childProcess = spawn(command, [], {
        stdio: ['pipe', 'pipe', 'pipe'],
        shell: true,
      });

      this.childProcess.stdout.on('data', (data) => {
        outputBuffer.push(data.toString());
      });

      this.childProcess.stderr.on('data', (data) => {
        outputBuffer.push(data.toString());
      });

      this.childProcess.on('exit', (code) => {
        // Process exited; you can handle this as needed.
        this.childProcess = null;
      });

      // Send the command to the shell.
      this.childProcess.stdin.write(`${command}\n`);
    } else {
      // Send a new command to the existing shell.
      this.childProcess.stdin.write(`${createPromptDto.command}\n`);
    }

    return new Promise<string>((resolve, reject) => {
      const timeout = setTimeout(() => {
        reject(new Error('Command execution timed out.'));
        this.childProcess.kill();
      }, 5000); // Timeout in milliseconds (adjust as needed).

      this.childProcess.on('exit', (code) => {
        clearTimeout(timeout);
        resolve(outputBuffer.join(''));
      });
    });
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
