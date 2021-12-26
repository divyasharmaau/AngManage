export interface AppUserLeaveModel {
    id: number,
    fullName: string,
    fromDate: Date,
    tillDate: Date,
    //joiningDate: Date,
    leaveType: string,
    leaveId: number,
    numberOfLeaveDays: number,
    reason: string,
    leaveStatus: string,
    duration: number,
    balanceAnnualLeave: number,
    balanceSickLeave: number
}