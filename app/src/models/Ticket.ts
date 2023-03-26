class Ticket {
    tickedID: any;
    name: string;
    price: any;
    periodic: any;

    constructor(ticketID?: any, name?: string, price?: any, periodic?: any) {
        this.tickedID = ticketID ?? 1;
        this.name = name ?? '';
        this.price = price ?? '';
        this.periodic = periodic ?? false;
    };
};

export default Ticket;