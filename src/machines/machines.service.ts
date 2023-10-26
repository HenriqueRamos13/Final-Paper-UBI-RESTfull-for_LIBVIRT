import { Injectable } from '@nestjs/common';
import { CreateMachineDto } from './dto/create-machine.dto';
import { UpdateMachineDto } from './dto/update-machine.dto';
import { exec } from 'child_process';

@Injectable()
export class MachinesService {
  async create(createMachineDto: CreateMachineDto) {
    let output: string | null;
    await exec('virsh list', (err, stdout, stderr) => {
      if (err) {
        console.log(err);
      }
      output = stdout;
    });
    return { output };
  }

  findAll() {
    return `This action returns all machines`;
  }

  findOne(id: number) {
    return `This action returns a #${id} machine`;
  }

  update(id: number, updateMachineDto: UpdateMachineDto) {
    return `This action updates a #${id} machine`;
  }

  remove(id: number) {
    return `This action removes a #${id} machine`;
  }
}
