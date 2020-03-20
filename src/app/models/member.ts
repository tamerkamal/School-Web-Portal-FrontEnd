import { MembershipType } from "./membershipType";

export class Member{
    Email: string;      
    FirstName: string;
    LastName: string;
    BirthDate: Date;    
    Phone: string;    
    Address:string;   
    MembershipTypeId:string;
    MembershipType:MembershipType;
}

