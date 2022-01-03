import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { Leave } from '../interfaces/leave';
import { LeaveService } from '../services/leave.service';


@Component({
  selector: 'app-edit-my-leave',
  templateUrl: './edit-my-leave.component.html',
  styleUrls: ['./edit-my-leave.component.css']
})

export class EditMyLeaveComponent implements OnInit {

  leaveDetails : Leave;
  form: FormGroup;
  minDate: Date;
  maxDate: Date;

  selectedFile: File = null;
  url : any;
  photoPath2 : string ="";
  leaveId: number = 0;


 

  successMessage : string = "Leave has been applied";
  leaveEdited: boolean = false;

  constructor(private activatedRoute : ActivatedRoute, private leaveService: LeaveService, private fb : FormBuilder) {
    
    this.form = this.fb.group({
      "currentDate" : [''],
      "joiningDate" : [''],
      "fromDate":[''],
      "tillDate":[''],
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

  // ngOnInit(): void {
  //   var id = +this.activatedRoute.snapshot.paramMap.get(id);
  //   this.showMyLeaveDetails(id);
  //   this.getContent();
  // }
  ngOnInit(): void {
    //'id' : url 

     var id = +this.activatedRoute.snapshot.paramMap.get('id');

    this.leaveId = id;
    this.leaveService.myLeaveDetails(id)
    .subscribe(data =>
      {
   
          this.leaveDetails = data;
 alert(this.leaveDetails.id);
          //this.getFileName(this.leave.filePath);
         // alert(this.leave.filePath.substr(this.leave.filePath.lastIndexOf("/")+1));
          // now data is here and can be used to set initial form values, example:
          // this.form.get('duration').setValue(this.leaveDetails.duration);
         // this.form.get('id').setValue(this.leaveDetails.id);
          this.form.get('currentDate').setValue (moment(this.leaveDetails.currentDate).format('DD-MM-YYYY'));
          this.form.get('joiningDate').setValue(moment(this.leaveDetails.joiningDate).format('DD-MM-YYYY'));
          this.form.get('fromDate').setValue(this.leaveDetails.fromDate);
          this.form.get('tillDate').setValue(this.leaveDetails.tillDate);
          this.form.get('leaveType').setValue(this.leaveDetails.leaveType);
          this.form.get('duration').setValue(this.leaveDetails.duration);
          this.form.get('reason').setValue(this.leaveDetails.reason);
          this.form.get('filePath').setValue( this.leaveDetails.filePath.substr(this.leaveDetails.filePath.lastIndexOf("/")+1));
          this.form.get('balanceAnnualLeave').setValue(this.leaveDetails.balanceAnnualLeave);
          this.form.get('balanceSickLeave').setValue(this.leaveDetails.balanceSickLeave);
           //this.form.get('filePath').setValue(this.leave.filePath);
          //location.pathname.substr(location.pathname.lastIndexOf("/")+1);
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
       alert("hello");
        // id : this.empOfficialDetails.employeePersonalDetails.id,
        // fullName: this.empOfficialDetails.firstName +" "+ this.empOfficialDetails.lastName  || '',
  
        // photo:this.empOfficialDetails.employeePersonalDetails.photo || '',
        // photoPath:this.empOfficialDetails.employeePersonalDetails.photoPath || '',
  
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
