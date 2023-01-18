class AirReading {
    airReadingDate: string;
    PM10: any;
    SO2: any;
    PM25: any;
    NO2: any;
    O3: any;

    constructor(airReadingDate?: string, PM10?: any, SO2?: any, PM25?: any, NO2?: any, O3?: any) {
        this.airReadingDate = airReadingDate ?? '';
        this.PM10 = PM10 ?? '';
        this.SO2 = SO2 ?? '';
        this.PM25 = PM25 ?? '';
        this.NO2 = NO2 ?? '';
        this.O3 = O3 ?? '';
    }
};  

export default AirReading;