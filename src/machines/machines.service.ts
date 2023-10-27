import { Injectable } from '@nestjs/common';
import { CreateMachineDto } from './dto/create-machine.dto';
import { UpdateMachineDto } from './dto/update-machine.dto';
import { exec } from 'child_process';

@Injectable()
export class MachinesService {
  executeCommand = (command: string) =>
    new Promise((resolve) => {
      exec(command, (err, stdout, stderr) => {
        if (err) {
          console.error(`Custom ERROR \n Command: ${command} \n Erro - ${err}`);
          resolve(stderr);
        } else {
          resolve(stdout);
        }
      });
    });

  async create(createMachineDto: CreateMachineDto) {
    const {
      name,
      ram,
      vcpu,
      disks,
      'os-type': osType,
      'os-variant': osVariant,
      network,
      graphics,
      console,
      location,
    } = createMachineDto;

    return await this.executeCommand(`
      virt-install \
        --name ${name} \
        --ram ${ram} \
        --vcpus ${vcpu} \
        --disk path=${location},size=${disks.size} \
        --os-type ${osType} \
        --os-variant ${osVariant} \
        --network bridge=${network.bridge} \
        --graphics ${graphics} \
        --console ${
          console.pty
            ? `pty,target_type=${console.target_type}`
            : `tty,target_type=${console.target_type}`
        } \
        --location ${location}
    `);
  }

  async findAll() {
    return await this.executeCommand('virsh list --all');
  }

  async update(name: string, updateMachineDto: UpdateMachineDto) {
    return `This action updates a #${name} machine`;
  }

  async reboot(name: string) {
    return await this.executeCommand(`virsh reboot ${name}`);
  }

  async start(name: string) {
    return await this.executeCommand(`virsh start ${name}`);
  }

  async shutdown(name: string) {
    return await this.executeCommand(`virsh shutdown ${name}`);
  }

  async destroy(name: string) {
    return await this.executeCommand(`virsh destroy ${name}`);
  }

  async undefine(name: string) {
    return await this.executeCommand(`virsh undefine ${name}`);
  }

  async console(name: string) {
    return await this.executeCommand(`virsh console ${name}`);
  }

  async createSnapshot(name: string, snapshotName: string) {
    return await this.executeCommand(
      `virsh snapshot-create ${name} --name ${snapshotName}`,
    );
  }

  async listSnapshots(name: string) {
    return await this.executeCommand(`virsh snapshot-list ${name}`);
  }

  async deleteSnapshot(name: string, snapshotName: string) {
    return await this.executeCommand(
      `virsh snapshot-delete ${name} --snapshotname ${snapshotName}`,
    );
  }

  async revertSnapshot(name: string, snapshotName: string) {
    return await this.executeCommand(
      `virsh snapshot-revert ${name} --snapshotname ${snapshotName}`,
    );
  }
}
