export class Player {
  private _lvl: number;
  private _xpRequired: number;
  private _xp: number;
  private _name: String;
  private _color: String;

  constructor(public data: String | Player) {
    if (data instanceof Player) {
      this._lvl = data.getLvl();
      this._xpRequired = data.getXpRequired();
      this._xp = data.getXp();
      this._name = data.getName();
      this._color = data.getColor();
    } else {
      this._lvl = 1;
      this._xpRequired = 10;
      this._xp = 0;
      this._name = data;
      this._color = '#FF0000';
    }
  }

  getLvl(): number {
    return this._lvl;
  }

  getXp(): number {
    return this._xp;
  }

  getXpRequired(): number {
    return this._xpRequired;
  }

  getName(): String {
    return this._name;
  }

  getColor(): String {
    return this._color;
  }

  setColor(color: String): void {
    this._color = color;
  }

  setName(name: String): void {
    this._name = name;
  }

  updateXP(
    cellVisited: number,
    cellUnvisited: number
  ): { leveling: number; xp: number } {
    let xpToGive: number = cellUnvisited * 2 - cellVisited + this._xp;
    let leveling = 0;
    while (xpToGive >= this._xpRequired) {
      xpToGive -= this._xpRequired;
      this._lvl += 1;
      leveling += 1;
      this._xpRequired = this._xpRequired * 1.5;
    }
    this._xp = xpToGive;
    return { leveling, xp: this._xp };
  }
}
