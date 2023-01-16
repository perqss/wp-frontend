class Building {
    buildingId: number;
    buildingName: string;
    address: string;

    constructor(buildingId?: number, buildingName?: string, address?: string) {
        this.buildingId = buildingId ?? 1;
        this.buildingName = buildingName ?? '';
        this.address = address ?? '';
    }
}

export default Building;