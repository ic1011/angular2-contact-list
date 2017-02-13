import { Injectable } from '@angular/core';

export class Contact {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    gender: Gender;
}

enum Gender {
    female = 1,
    male = 2
}

/**
 * The @Injectable decorator is not really needed when the class have no other dependencies
 * but it is considered best practice to decorate all injectable classes.
 */
@Injectable()
export class Utils {
    public getGenderAsName(gender: Gender) {
        return Gender[gender];
    }

    public getGenderAsKeyValueCollection() {
        var keys = Object.keys(Gender);

        return keys.slice(0, keys.length / 2).map(function (value) {
            return { key: value, value: Gender[value] };
        });
    }
}
