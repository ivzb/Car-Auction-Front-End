import { LotModel } from '../base/lot.model';
import { Bid } from '../bids/bid';
import { Category } from '../categories/category';
import { Color } from '../colors/color';
import { Currency } from '../currencies/currency';
import { Fuel } from '../fuels/fuel';
import { Image } from '../images/image';
import { Location } from '../locations/location';
import { Make } from '../makes/make';
import { Model } from '../models/model';
import { Transmission } from '../transmissions/transmission';

export class Car extends LotModel {
    public MakeId: number;
    public Make: Make;
    public ModelId: number;
    public Model: Model;
    public CategoryId: number;
    public Category: Category;
    public LocationId: number;
    public Location: Location;
    public CurrencyId: number;
    public Currency: Currency;
    public TransmissionId: number;
    public Transmission: Transmission;
    public FueldId: number;
    public Fuel: Fuel;
    public ColorId: number;
    public Color: Color;
    
    public Year: number;
    public Title: string;
    public VIN: string;
    public EstimatedValue: number;
    public Odometer: number;
    public Engine: number;
    public PrimaryDamage: string;
    public SecondaryDamage: string;
    public BodyStyle: string;
    public Drive: string;
    public AuctionOn: string; // todo: make it date

    public Bids: Bid[];
    public Images: Image[];
}