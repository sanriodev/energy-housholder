import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { ObjectId } from 'mongoose';

export class UpdateEnergyEntryDto {
  @ApiProperty({
    description: 'The mongo id',
    example: '2318931289123890',
  })
  @IsNotEmpty()
  _id: ObjectId;

  @ApiProperty({
    description: 'The battery level',
    example: 100,
  })
  @IsOptional()
  batteryLevel: number;

  @ApiProperty({
    description: 'The battery level in percent',
    example: '45%',
  })
  @IsOptional()
  batteryPercent: string;

  @ApiProperty({
    description: 'The battery voltage',
    example: '5V',
  })
  @IsOptional()
  batteryVoltage: string;

  @ApiProperty({
    description: 'The battery status',
    example: 'charging',
  })
  @IsOptional()
  batteryStatus: string;
}
