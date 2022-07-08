import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable()
export class MazeDataService {
    private _data: BehaviorSubject<any> = new BehaviorSubject<any>(null);

    public setData(data: any): void {
        this._data.next(data);
    }

    public getData(): Observable<any> {
        return this._data.asObservable();
    }
};