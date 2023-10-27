import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { MachinesService } from './machines.service';
import { CreateMachineDto } from './dto/create-machine.dto';
import { UpdateMachineDto } from './dto/update-machine.dto';

@Controller('machines')
export class MachinesController {
  constructor(private readonly machinesService: MachinesService) {}

  @Post()
  create(@Body() createMachineDto: CreateMachineDto) {
    return this.machinesService.create(createMachineDto);
  }

  @Get()
  findAll() {
    return this.machinesService.findAll();
  }

  @Patch(':name')
  update(
    @Param('name') name: string,
    @Body() updateMachineDto: UpdateMachineDto,
  ) {
    return this.machinesService.update(name, updateMachineDto);
  }

  @Get('reboot/:name')
  reboot(@Param('name') name: string) {
    return this.machinesService.reboot(name);
  }

  @Get('start/:name')
  start(@Param('name') name: string) {
    return this.machinesService.start(name);
  }

  @Get('shutdown/:name')
  shutdown(@Param('name') name: string) {
    return this.machinesService.shutdown(name);
  }

  @Get('destroy/:name')
  destroy(@Param('name') name: string) {
    return this.machinesService.destroy(name);
  }

  @Get('undefine/:name')
  undefine(@Param('name') name: string) {
    return this.machinesService.undefine(name);
  }

  @Get('console/:name')
  console(@Param('name') name: string) {
    return this.machinesService.console(name);
  }

  @Get('createSnapshot/:name/:snapshotName')
  createSnapshot(
    @Param('name') name: string,
    @Param('snapshotName') snapshotName: string,
  ) {
    return this.machinesService.createSnapshot(name, snapshotName);
  }

  @Get('listSnapshots/:name')
  listSnapshots(@Param('name') name: string) {
    return this.machinesService.listSnapshots(name);
  }

  @Get('deleteSnapshot/:name/:snapshotName')
  deleteSnapshot(
    @Param('name') name: string,
    @Param('snapshotName') snapshotName: string,
  ) {
    return this.machinesService.deleteSnapshot(name, snapshotName);
  }

  @Get('revertSnapshot/:name/:snapshotName')
  revertSnapshot(
    @Param('name') name: string,
    @Param('snapshotName') snapshotName: string,
  ) {
    return this.machinesService.revertSnapshot(name, snapshotName);
  }
}
