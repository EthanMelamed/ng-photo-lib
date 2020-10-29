export class PhotoModel {
    public url: string;
    public position?: PositionModel = {x: 50, y: 50};

    constructor(config: PhotoModel) {
        this.url = config.url;
        this.position = new PositionModel(config.position);
    }
}

export class PositionModel {
    public x: number;
    public y: number;

    constructor(config: PositionModel) {
        if (!config) {
            this.x = 0;
            this.y = 0;
        } else {
            this.x = config.x;
            this.y = config.y;
        }
    }

    public toString(): string {
        return `${this.x}% ${this.y}%`;
    }
}
