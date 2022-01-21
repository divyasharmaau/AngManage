
export interface EmployeePersonalDetails {
    id: string,
    fullName: string,
    bankName: string,
    branch: string,
    accountName: string,
    bsb: number,
    accountNumber: number,
    houseNumber: number,
    street: string,
    city: string,
    state: string,
    country: string,
    zipCode: number,

    photoPath: string, //domainphotoPath
    existingPhotoPath: string,
    apiPhotoPath:string;
    photo: string, //upload
    
    dateOfBirth: Date,
    nationality: string,
    bloodGroup: string,
    maritalStatus: string,
    gender: string,
    relationship: string,
    emergencyContact: string, 
    emergencyContactPhoneNumber: number,
    emergencyContactHouseNumber: number,
    emergencyContactStreet: number,
    emergencyContactCity: string,
    emergencyContactState: string,
    emergencyContactCountry: string,
    emergencyContactZipCode: number
}