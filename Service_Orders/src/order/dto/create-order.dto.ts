import { IsNotEmpty, IsInt, IsString } from "class-validator";

export class CreateOrderDto {
    @IsInt()
    @IsNotEmpty()
    orderId : number;

    @IsString()
    @IsNotEmpty()
    status :   "TRAITEE" | "ENCOURS" | "EXPEDIEE";

}
