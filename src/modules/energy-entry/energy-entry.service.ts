import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import {
  EnergyEntry,
  EnergyEntryDocument,
} from '../../schemas/energy-entry.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { CreateEnergyEntryDto } from '../../dto/create-energy-entry.dto';
import { UpdateEnergyEntryDto } from '../../dto/update-energy-entry.dto';

@Injectable()
export class EnergyEntryService {
  constructor(
    @InjectModel(EnergyEntry.name)
    private readonly energyEntryModel: Model<EnergyEntryDocument>,
  ) {}

  async create(createDto: CreateEnergyEntryDto): Promise<EnergyEntryDocument> {
    try {
      return await this.energyEntryModel.create({
        batteryLevel: createDto.batteryLevel,
        batteryPercent: createDto.batteryPercent,
        batteryVoltage: createDto.batteryVoltage,
        batteryStatus: createDto.batteryStatus,
        occuredAt: new Date(),
      });
    } catch (error) {
      throw new UnprocessableEntityException(error);
    }
  }

  async update(updateDto: UpdateEnergyEntryDto): Promise<EnergyEntryDocument> {
    try {
      return await this.energyEntryModel.findOneAndUpdate(
        {
          _id: updateDto._id,
        },
        {
          batteryLevel: updateDto.batteryLevel,
          batteryPercent: updateDto.batteryPercent,
          batteryVoltage: updateDto.batteryVoltage,
          batteryStatus: updateDto.batteryStatus,
        },
        {
          new: true,
        },
      );
    } catch (error) {
      throw new UnprocessableEntityException(error);
    }
  }

  async get(id: ObjectId | string): Promise<EnergyEntryDocument> {
    try {
      return await this.energyEntryModel.findOne({
        _id: id,
      });
    } catch (error) {
      throw new UnprocessableEntityException(error);
    }
  }

  async getAll(): Promise<EnergyEntryDocument[]> {
    try {
      return await this.energyEntryModel.find();
    } catch (error) {
      throw new UnprocessableEntityException(error);
    }
  }
}