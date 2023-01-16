class Employee {
    employeeID: number;
    pesel: string;
    firstName: string;
    lastName: string;
    gender: string;
    birthDate: string;
    hireDate: string;
    phoneNumber: string;
    address: string;
    city: string;
    departmentID: number;

    constructor(employeeID?: number, pesel?: string, firstName?: string, lastName?: string, gender?: string, birthDate?: string, hireDate?: string, phoneNumber?: string, 
        address?: string, city?: string, departmentID?: number) {
        this.employeeID = employeeID ?? 1;
        this.pesel = pesel ?? '';
        this.firstName = firstName ?? '';
        this.lastName = lastName ?? '';
        this.gender = gender ?? '';
        this.birthDate = birthDate ?? '';
        this.hireDate = hireDate ?? '';
        this.phoneNumber = phoneNumber ?? '';
        this.address = address ?? '';
        this.city = city ?? '';
        this.departmentID = departmentID ?? 0;
    }
}

export default Employee;