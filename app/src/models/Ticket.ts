class Ticket {
    tickedId: number;
    name: string;
    price: number;
    periodic: boolean;

    constructor(ticketId?: number, name?: string, price?: number, periodic?: boolean) {
        this.tickedId = ticketId ?? 1;
        this.name = name ?? '';
        this.price = price ?? 0;
        this.periodic = periodic ?? false;
    };
};

export default Ticket;