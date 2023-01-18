class Building {
    buildingId: any;
    buildingName: string;
    address: string;

    constructor(buildingId?: any, buildingName?: string, address?: string) {
        this.buildingId = buildingId ?? '';
        this.buildingName = buildingName ?? '';
        this.address = address ?? '';
    }
}

export default Building;