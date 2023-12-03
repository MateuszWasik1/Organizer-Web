import { Injectable } from "@angular/core";
import { Guid } from "guid-typescript";

@Injectable({
    providedIn: 'root'
})
export class FillDataService {
    public FillCategories(){
        let cid = [1, 22, 34, 54, 245, 684, ];
        let cgid = [Guid.create(), Guid.create(), Guid.create(), Guid.create(), Guid.create(), Guid.create(), Guid.create(), Guid.create(), Guid.create(), Guid.create()];
        let cuid = [1, 2, 3, 4, 55, 120, 122, 168, 200, 201];
        let cName = ["Sport", "Zdrowie", "Nauka", "Uroda", "Spożywcze", "Intelektualne", "Praca", "Prezenty", "Samorozwój", "Atrakcje"];
        let cStartDate = [new Date(2023, 11, 1), new Date(2023, 12, 1), new Date(2023, 6, 23), new Date(2023, 7, 15), new Date(2023, 1, 1), new Date(2023, 12, 31), new Date(2023, 6, 30), new Date(2023, 11, 30), new Date(2023, 2, 28), new Date(2023, 11, 9)];
        let cEndDate = [new Date(2024, 11, 1), new Date(2022, 12, 1), new Date(2023, 9, 23), new Date(2023, 1, 15), new Date(2023, 1, 1), new Date(2023, 12, 31), new Date(2022, 2, 22), new Date(2023, 11, 30), new Date(2023, 2, 28), new Date(2023, 10, 6)];
        let cBudget = [1111, 2222, 5000, 10000, 20034, 50231, 69420, 1111111, 2838283, 99293492342];
        let cBudgetCount = [345, 444, 556, 1233, 6742, 9893, 12345, 12999, 21231, 33333];

        let result = [];

        for(let i = 0; i < 5; i++){
            let category = {
                cid: cid[Math.floor(Math.random() * 10)], 
                cgid: cgid[Math.floor(Math.random() * 10)],
                cuid: cuid[Math.floor(Math.random() * 10)],
                cName: cName[Math.floor(Math.random() * 10)],
                cStartDate: cStartDate[Math.floor(Math.random() * 10)],
                cEndDate: cEndDate[Math.floor(Math.random() * 10)],
                cBudget: cBudget[Math.floor(Math.random() * 10)],
                cBudgetCount: cBudgetCount[Math.floor(Math.random() * 10)], 
            }

            result.push(category);
        }
        return result;
    }
}