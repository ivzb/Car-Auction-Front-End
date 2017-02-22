import { BaseModel } from '../base/base.model'

export class Bid extends BaseModel  {
    public Cost: number;
    public Location: string;
    public CarId: number;
}