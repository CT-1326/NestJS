import { IsString, IsOptional, IsDecimal, IsDate } from 'class-validator';

export class UpdateProductSalesLocationInput {
  @IsString()
  @IsOptional()
  address: string;

  @IsString()
  @IsOptional()
  addressDetail: string;

  @IsDecimal()
  @IsOptional()
  lat: number; //위도

  @IsDecimal()
  @IsOptional()
  lng: number; //경도

  @IsDate()
  @IsOptional()
  meetingTime: Date;
}
