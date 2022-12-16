export abstract class Entity {
  private _id;

  constructor(id: string) {
    this._id = id;
  }

  get id() {
    return this._id;
  }
}
