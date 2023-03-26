class Building {
    buildingID: any;
    buildingName: string;
    address: string;

    constructor(buildingID?: any, buildingName?: string, address?: string) {
        this.buildingID = buildingID ?? 1;
        this.buildingName = buildingName ?? '';
        this.address = address ?? '';
    }
}

export default Building;