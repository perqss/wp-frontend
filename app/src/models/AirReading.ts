class AirReading {
    airReadingDate: string;
    pm10: any;
    so2: any;
    pm25: any;
    no2: any;
    o3: any;

    constructor(airReadingDate?: string, pm10?: any, so2?: any, pm25?: any, no2?: any, o3?: any) {
        this.airReadingDate = airReadingDate ?? '';
        this.pm10 = pm10 ?? '';
        this.so2 = so2 ?? '';
        this.pm25 = pm25 ?? '';
        this.no2 = no2 ?? '';
        this.o3 = o3 ?? '';
    }
};  

export default AirReading;