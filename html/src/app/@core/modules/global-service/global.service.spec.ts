/*
 * Copyright (C) 2021. NTT Data S.A. All Rights Reserved
 * Created: 25/5/21 10:31
 */

import { TestBed } from '@angular/core/testing';

import { GlobalService } from './global.service';

describe('GlobalsService', () => {
    let service: GlobalService;

    const obj1 = {name: 'Sergio', surname: 'Gómez'};
    let obj2 = {};

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(GlobalService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('Method toObject should return object from array', () => {
        const arrayTest = ['one', 'two'];
        const objectTest = {0: 'one', 1: 'two'};
        expect(service.toObject(arrayTest)).toEqual(objectTest);
    });

    it('Method isEqual should return true when comparing 2 equal objects', () => {
        obj2 = {name: 'Sergio', surname: 'Gómez'};
        expect(service.isEqual(obj1, obj2)).toBeTrue();
    });

    it('Method isEqual should return false when comparing 2 different objects', () => {
        obj2 = {name: 'Sergio'};
        expect(service.isEqual(obj1, obj2)).toBeFalse();
    });

    it('Method isEqual should return false when comparing 2 objects with the same number of properties and different value', () => {
        obj2 = {name: 'Sergio', surname: 'X'};
        expect(service.isEqual(obj1, obj2)).toBeFalse();
    });
});
