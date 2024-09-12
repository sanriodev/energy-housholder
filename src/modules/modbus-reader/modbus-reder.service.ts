import { Injectable, Logger } from '@nestjs/common';
import ModbusRTU from 'modbus-serial';

@Injectable()
export class ModbusReaderService {
  private client: ModbusRTU;

  constructor() {
    this.client = new ModbusRTU();
  }

  async connect(
    port: string = '/dev/ttyUSB0',
    baudRate: number = 9600,
  ): Promise<void> {
    try {
      // Open the serial port
      await this.client.connectRTUBuffered(port, { baudRate });
      // Set the slave ID (usually the address of the device)
      this.client.setID(1);
      // Set a timeout for the connection
      this.client.setTimeout(1000);
      Logger.log('Connected to Modbus device');
    } catch (error) {
      Logger.error('Failed to connect to Modbus device', error);
    }
  }

  async readHoldingRegisters(
    address: number,
    length: number,
  ): Promise<number[]> {
    try {
      const data = await this.client.readHoldingRegisters(address, length);
      return data.data;
    } catch (error) {
      Logger.error('Failed to read holding registers', error);
      throw error;
    }
  }

  async disconnect(): Promise<void> {
    try {
      await this.client.close(() => {});
      Logger.log('Disconnected from Modbus device');
    } catch (error) {
      Logger.error('Failed to disconnect from Modbus device', error);
    }
  }
}
