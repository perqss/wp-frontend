class Logger {
    private logs: object[];
    private static instance: Logger;
    private constructor() {
        this.logs = []
    };
    get count(): number {
        return this.logs.length
    };
    public static getInstance(): Logger {
        if (!Logger.instance) {
            Logger.instance = new Logger()
        }        
        return Logger.instance;
    };
    log(message: string) {
        const timestamp: string = new Date().toISOString()
        this.logs.push(
            { message, timestamp }
        );
        console.log(`${timestamp} - ${message}`);
    };
}

export default Logger;