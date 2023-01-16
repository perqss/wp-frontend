class AirReading {
    airReadingDate: string;
    pm10: number;
    so2: number;
    pm25: number;
    no2: number;
    o3: number;

    constructor(airReadingDate?: string, pm10?: number, so2?: number, pm25?: number, no2?: number, o3?: number) {
        this.airReadingDate = airReadingDate ?? '';
        this.pm10 = pm10 ?? 0;
        this.so2 = so2 ?? 0;
        this.pm25 = pm25 ?? 0;
        this.no2 = no2 ?? 0;
        this.o3 = o3 ?? 0;
    }
};  

export default AirReading;