import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { AuthenticationService } from 'src/app/auth/authentication.service';
import { BaseErrorFormComponent } from 'src/app/shared/baseErrorFormComponent';

import { Leave } from '../interfaces/leave';
import { LeaveService } from '../services/leave.service';


@Component({
  selector: 'app-edit-my-leave',
  templateUrl: './edit-my-leave.component.html',
  styleUrls: ['./edit-my-leave.component.css']
})

export class EditMyLeaveComponent  extends BaseErrorFormComponent implements OnInit {

  leaveDetails : Leave;
  form: FormGroup;

  employeeId: string ="";
  fileName:string="";

  minDate: Date;
  maxDate: Date;


  selectedFile: File = null;
  url : any;
  leaveId: number = 0;

  successMessage : string = "Leave has been edited";
  leaveEdited: boolean = false;

  constructor(private activatedRoute : ActivatedRoute, private leaveService: LeaveService, 
    private fb : FormBuilder, authenticationService: AuthenticationService) {
    
    super();

    this.employeeId =authenticationService.getUserId();
    this.form = this.fb.group({
      "currentDate" : [''],
      "joiningDate" : [''],
      "fromDate":['', Validators.required],
      "tillDate":['', Validators.required],
      "leaveType":[''],
      "duration":[''],
      "reason":[''],
      "balanceAnnualLeave":[''],
      "balanceSickLeave":[''],
      "filePath":[''],
      "file":['']

    });

    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 20, 0, 1);
    this.maxDate = new Date(currentYear + 1, 11, 31);
   }


  ngOnInit(): void {

     var id = +this.activatedRoute.snapshot.paramMap.get('id');

    this.leaveId = id;
    this.leaveService.myLeaveDetails(id)
    .subscribe(data =>
      {
   
          this.leaveDetails = data;
          this.form.get('currentDate').setValue (moment(this.leaveDetails.currentDate).format('DD-MM-YYYY'));
          this.form.get('joiningDate').setValue(moment(this.leaveDetails.joiningDate).format('DD-MM-YYYY'));
          this.form.get('fromDate').setValue(this.leaveDetails.fromDate);
          this.form.get('tillDate').setValue(this.leaveDetails.tillDate);
          this.form.get('leaveType').setValue(this.leaveDetails.leaveType);
          this.form.get('duration').setValue(this.leaveDetails.duration);
          this.form.get('reason').setValue(this.leaveDetails.reason);
          this.form.get('filePath').setValue( this.getFileName(this.leaveDetails.filePath));
          this.form.get('balanceAnnualLeave').setValue(this.leaveDetails.balanceAnnualLeave);
          this.form.get('balanceSickLeave').setValue(this.leaveDetails.balanceSickLeave);
   
      }
      );

  }

    
    showMyLeaveDetails(id:number){
      this.leaveService.myLeaveDetails(id)
      .subscribe( data => {
        this.leaveDetails = data;
      })
    }

    getContent(){
      this.form.setValue({
        currentDate : this.leaveDetails.currentDate || '',
        joiningDate :  this.leaveDetails.joiningDate ||'',
        fromDate: this.leaveDetails.fromDate || '',
        tillDate: this.leaveDetails.tillDate || '',
        leaveType: this.leaveDetails.leaveType || '',
        duration: this.leaveDetails.duration || '',
        reason: this.leaveDetails.reason || '',
        balanceAnnualLeave: this.leaveDetails.balanceAnnualLeave || '',
        balanceSickLeave: this.leaveDetails.balanceSickLeave || '',
        filePath: this.leaveDetails.filePath || ''
       });
    }

  //Date Comparison
    onTillDate(){
      const startDate = this.fromDate.value;
      const endDate = this.tillDate.value;
    if(endDate < startDate ){
      this.tillDate.setErrors({mismatch:true});
    }
    else if (startDate == null && endDate != null){
      this.tillDate.setErrors({mismatch:true});
      this.fromDate.setErrors({mismatch:true});
    }
    else
    {
      this.tillDate.setErrors(null);
    }
  }

  get fromDate(): AbstractControl{
    return this.form.controls['fromDate'];
  }

  get tillDate() : AbstractControl{
    return this.form.controls['tillDate'];
  }
  
//Extarct File Name for display
  getFileName(fileName: string){
    let name = this.leaveDetails.filePath.split('_');
    return this.fileName = name[1];
  }
    onSubmit(){
      const formData = new FormData();
      formData.append('currentDate', this.form.value.currentDate);
      formData.append('joiningDate', this.form.value.joiningDate);
      formData.append('fromDate', (moment(this.form.value.fromDate).format('DD-MM-YYYY')).toString());
      formData.append('tillDate', (moment(this.form.value.tillDate).format('DD-MM-YYYY')).toString());
      formData.append('leaveType', this.form.value.leaveType);
      formData.append('duration', this.form.value.duration);
      formData.append('reason', this.form.value.reason);
      formData.append('id' , this.leaveId.toString());
      formData.append('balanceAnnualLeave', this.form.value.balanceAnnualLeave);
      formData.append('balanceSickLeave', this.form.value.balanceSickLeave);
      formData.append('file',this.selectedFile);
     
      this.leaveService.editLeave(this.leaveDetails.id, formData)
      .subscribe(data =>{
        this.leaveEdited = true;
      })
      // formData.append('id', )this.leaveDetails.id);
    alert("submit");
    }

    //get the selected file
      onSelectFile(event: any) {
        this.selectedFile = <File>event.target.files[0];
        if (event.target.files && event.target.files[0]) {
                var reader = new FileReader();
                reader.onload = (event: any) => {
                    this.url = event.target.result;
                }
                reader.readAsDataURL(event.target.files[0]);
            }
            else
            {
              this.url = "";
            }
      
      }
}
