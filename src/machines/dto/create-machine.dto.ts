import { ApiProperty } from '@nestjs/swagger';

export class CreateMachineDto {
  @ApiProperty()
  name: string;

  @ApiProperty({
    default: 1024,
  })
  ram: number;

  @ApiProperty({
    default: 2,
  })
  vcpu: number;

  @ApiProperty({
    default: {
      path: '/var/lib/libvirt/images',
      size: 10,
    },
  })
  disks?: {
    path: string;
    size: number;
  };

  @ApiProperty({
    default: 'linux',
  })
  'os-type': string;

  @ApiProperty({
    default: 'generic',
  })
  'os-variant': string;

  @ApiProperty({
    default: {
      bridge: 'br0',
    },
  })
  network: {
    bridge: string;
  };

  @ApiProperty({
    default: 'spice',
  })
  graphics: string;

  @ApiProperty({
    default: {
      pty: true,
      target_type: 'serial',
    },
  })
  console: {
    pty: boolean;
    target_type: string;
  };

  @ApiProperty({
    default: 'http://example.com/path/to/iso',
  })
  location?: string;
}
