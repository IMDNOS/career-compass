export declare enum Gender {
    Male = "male",
    Female = "female"
}
export declare class Employee {
    id: number;
    name: string;
    email: string;
    hashed_password: string;
    hashedRT: string | null;
    image: string;
    resume: string;
    gender: Gender;
}
