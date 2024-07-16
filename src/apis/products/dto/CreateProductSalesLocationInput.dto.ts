import { IsString, IsDecimal, IsDate } from 'class-validator';

export class CreateProductSalesLocationInput {
  @IsString()
  address: string;

  @IsString()
  addressDetail: string;

  @IsDecimal()
  lat: number;

  @IsDecimal()
  lng: number;

  @IsDate()
  meetingTime: Date;
}
