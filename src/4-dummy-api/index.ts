import axios, { AxiosResponse, AxiosError } from 'axios';

enum Gender {
    male = 'male',
    female = 'female',
}

enum BloodGroup {
    OPositive = 'O+',
    APositive = 'A+',
    BPositive = 'B+',
    ABPositive = 'AB+',
    ONegative = 'O-',
    ANegative = 'A-',
    BNegative = 'B-',
    ABNegative = 'AB-',
}

enum EyeColor {
    green = 'Green',
    brown = 'Brown',
    gray = 'Gray',
    amber = 'Amber',
    blue = 'Blue',
}

enum HairColor {
    black = 'Black',
    blond = 'Blond',
    brown = 'Brown',
    chestnut = 'Chestnut',
    auburn = 'Auburn',
}

enum HairType {
    standart = 'Strands',
    curly = 'Curly',
    veryCurly = 'Very curly',
    straight = 'Straight',
    wavy = 'Wavy',
}

interface Hair {
    color: HairColor;
    type: HairType;
}

interface Address {
    address: string;
    city: string;
    coordinates: Coordinates,
    postalCode: string;
    state: string;
}

interface Coordinates {
    lat: number;
    lng: number;
}

interface Bank {
    cardExpire: string;
    cardNumber: string;
    cardType: string;
    currency: string;
    iban: string;
}

interface Company {
    address: Address;
    department: string;
    name: string;
    title: string;
}

interface User {
    id: number;
    firstName: string;
    lastName: string;
    maidenName: string;
    age: number;
    gender: Gender;
    email: string;
    phone: string;
    username: string;
    password: string;
    birthDate: string;
    image: string;
    bloodGroup: BloodGroup;
    height: number;
    weight: number;
    eyeColor: EyeColor;
    hair: Hair;
    domain: string;
    ip: string;
    address: Address;
    macAddress: string;
    university: string;
    bank: Bank;
    company: Company;
    ein: string;
    ssn: string;
    userAgent: string;
}

interface ResponseData {
    total: number;
    skip: number;
    limit: number;
    users: User[];
}

interface ResponseError { }

function fetchUsers(): Promise<AxiosResponse<ResponseData, void>> {
    return axios.get('https://dummyjson.com/users');
}

fetchUsers()
    .then(({ data }) => {
        const output = data.users.map(({ firstName, hair: { color } }) =>
            `${firstName} with ${color} hair color`);

        console.log(output);
    })
    .catch((error) => {
        if (error instanceof AxiosError) {
            const { response } = error as AxiosError<ResponseError>;

            if (response) {
                const { data } = response;

                console.error(data);
            }
        }

        if (error instanceof Error) {
            console.error(error.message);
        }

        console.error(error);
    });
