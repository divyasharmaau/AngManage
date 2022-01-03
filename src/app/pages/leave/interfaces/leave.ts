export interface Leave{
    id : number, 
    currentDate : Date,
    leaveType: string,
    leaveStatus :string,
    fromDate: any,
    tillDate: any,
    duration: string,
    reason:string,
    comment:string,
    filePath:string,
    existingFilePath:string,
    balanceAnnualLeave:number,
    balanceSickLeave:number,
    joiningDate:Date
    //IFormFile: File

}