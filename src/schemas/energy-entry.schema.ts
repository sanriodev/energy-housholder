import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class EnergyEntry {
  @Prop({ required: true })
  batteryLevel: number;

  @Prop({ required: false })
  batteryPercent: string;

  @Prop({ required: false })
  batteryVoltage: string;

  @Prop({ required: false })
  batteryStatus: string;

  @Prop({ required: true })
  occuredAt: Date;

  constructor(data) {
    Object.assign(this, data);
  }
}

export type EnergyEntryDocument = EnergyEntry & Document;

export const EnergyEntrySchema = SchemaFactory.createForClass(EnergyEntry);
