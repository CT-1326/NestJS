import { IsString, IsDecimal, IsDate } from 'class-validator';

export class CreateProductSalesLocationInput {
  @IsString()
  address: string;

  @IsString()
  addressDetail: string;

  @IsDecimal()
  lat: number; //위도

  @IsDecimal()
  lng: number; //경도

  @IsDate()
  meetingTime: Date;
}
