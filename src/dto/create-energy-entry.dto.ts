import { ApiProperty, OmitType } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { UpdateEnergyEntryDto } from './update-energy-entry.dto';

export class CreateEnergyEntryDto extends OmitType(UpdateEnergyEntryDto, [
  '_id',
  'batteryLevel',
] as const) {
  @ApiProperty({
    description: 'The battery level',
    example: 100,
  })
  @IsNotEmpty()
  batteryLevel: number;
}
