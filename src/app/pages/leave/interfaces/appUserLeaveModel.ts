export interface AppUserLeaveModel {
    id: number,
    fullName: string,
    fromDate: any,
    tillDate: any,
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