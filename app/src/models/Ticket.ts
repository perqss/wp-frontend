class Ticket {
    tickedId: any;
    name: string;
    price: any;
    periodic: any;

    constructor(ticketId?: any, name?: string, price?: any, periodic?: any) {
        this.tickedId = ticketId ?? '';
        this.name = name ?? '';
        this.price = price ?? '';
        this.periodic = periodic ?? false;
    };
};

export default Ticket;