import { ValueModel } from '../base/value.model'
import { Make } from '../makes/make';

export class Model extends ValueModel {
    public MakeId: number;
    public Make: Make;
}