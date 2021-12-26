import { Department } from "./department";
import { EmployeePersonalDetails } from "./employeePersonalDetails"

export interface Employee{
    id: string,
    title: string,
    firstName: string,
    middleName: string,
    lastName: string,
    jobTitle: string,
    status: string,
    joiningDate: Date,
    daysWorkedInWeek: number,
    numberOfHoursWorkedPerDay: number,
    manager: string,
    password: string,
    confirmPassword:string,
    email: string,
    userName: string,
    //public bool EmailConfirmed { get; set; }
    //public bool LockoutEnabled { get; set; }
    departmentId: Department,
    department: Department
    employeePersonalDetails : EmployeePersonalDetails
 }
