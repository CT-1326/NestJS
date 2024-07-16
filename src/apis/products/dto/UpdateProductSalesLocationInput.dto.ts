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
  lat: number;

  @IsDecimal()
  @IsOptional()
  lng: number;

  @IsDate()
  @IsOptional()
  meetingTime: Date;
}
