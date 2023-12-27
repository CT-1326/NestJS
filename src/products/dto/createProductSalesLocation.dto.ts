import { IsDate, IsDecimal, IsString, } from 'class-validator';

export class ProductSalesLocationInput {
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
