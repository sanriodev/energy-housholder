import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Put,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { EnergyEntryService } from './energy-entry.service';
import { CreateEnergyEntryDto } from '../../dto/create-energy-entry.dto';
import { ReS } from '../../common/res.model';
import { UpdateEnergyEntryDto } from '../../dto/update-energy-entry.dto';
import { ObjectId } from 'mongoose';

@Controller('energy-data')
@ApiTags('energy-data')
export class EnergyEntryController {
  constructor(
    @Inject(EnergyEntryService)
    private readonly modbusReaderService: EnergyEntryService,
  ) {}

  @Post('/')
  @UseInterceptors(ClassSerializerInterceptor)
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  @ApiOperation({
    summary: 'create enery entry',
    description: 'create a new energy entry',
  })
  async create(@Body() createDto: CreateEnergyEntryDto) {
    return ReS.FromData(await this.modbusReaderService.create(createDto));
  }

  @Put('/')
  @UseInterceptors(ClassSerializerInterceptor)
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  @ApiOperation({
    summary: 'update enery entry',
    description: 'update a new energy entry',
  })
  async update(@Body() updateDto: UpdateEnergyEntryDto) {
    return ReS.FromData(await this.modbusReaderService.update(updateDto));
  }

  @Get('/')
  @UseInterceptors(ClassSerializerInterceptor)
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  @ApiOperation({
    summary: 'get all data',
    description: 'get all data from mongo',
  })
  async getAll() {
    return ReS.FromData(await this.modbusReaderService.getAll());
  }

  @Get('/:id')
  @ApiParam({
    name: 'id',
    description: 'The mongo id',
    allowEmptyValue: false,
    example: '222222222222222222222222',
    required: true,
    format: 'string',
  })
  @UseInterceptors(ClassSerializerInterceptor)
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  @ApiOperation({
    summary: 'get data by id',
    description: 'get data by id from mongo',
  })
  async get(@Param('id') id: string | ObjectId) {
    return ReS.FromData(await this.modbusReaderService.get(id));
  }
}
