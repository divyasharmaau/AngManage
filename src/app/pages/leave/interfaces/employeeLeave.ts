
import { Employee } from "../../employee/interfaces/employee";
import { Leave } from "./leave";

export interface EmployeeLeave{
    id: number;
    employeeId : string;
    employee : Employee;
    leaveId: number;
    leave: Leave;
    approved: string;
    declined: string;
    comment:string;
}