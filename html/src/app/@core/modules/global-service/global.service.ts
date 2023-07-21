/*
 * Copyright (C) 2021. NTT Data S.A. All Rights Reserved
 * Created: 25/5/21 10:31
 */

import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class GlobalService {

    toObject = arr => Object.assign({}, arr);

    /**
     * Compare two objects.
     *
     * @param obj1 - First object.
     * @param obj2 - Second object.
     */
    isEqual = (obj1, obj2) => {
        const obj1Keys = Object.keys(obj1);
        const obj2Keys = Object.keys(obj2);

        if (obj1Keys.length !== obj2Keys.length) {
            return false;
        }

        for (const objKey of obj1Keys) {
            if (obj1[objKey] !== obj2[objKey]) {
                return false;
            }
        }

        return true;
    };
}
