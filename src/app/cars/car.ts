import { Make } from '../makes/make';
import { Model } from '../models/model';
import { Category } from '../categories/category';
import { Bid } from '../bids/bid';
import { Image } from '../images/image';

export class Car {
    public Id: number;
    public Lot: number;
    public Year: number;
    public MakeId: number;
    public ModelId: number;
    public CategoryId: number;
    public Make: Make;
    public Model: Model;
    public Category: Category;
    public Damage: string;
    public EngineType: string;
    public Bids: Bid[];
    public Images: Image[];
    public CreatedOn: string;
}