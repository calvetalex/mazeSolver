import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Player } from "../Class/Player.class";

@Injectable({
    providedIn: 'root',
})
export class PlayerService {
    private _player: BehaviorSubject<Player>;
    public readonly player;

    constructor(oldPlayer: Player | null) {
        if (oldPlayer) {
            this._player = new BehaviorSubject<Player>(new Player(oldPlayer));
        } else {
            this._player = new BehaviorSubject<Player>(new Player("default"));
        }
        this.player = this._player.asObservable();
    }

    get() {
        return this.player;
    }
}