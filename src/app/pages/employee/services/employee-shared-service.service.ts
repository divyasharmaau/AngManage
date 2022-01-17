// import { Injectable } from '@angular/core';
// import { Observable, Subject } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class EmployeeSharedService {

//   searchEmployee$: Observable<any>;
//   private searchEmployeeSource = new Subject<string>();
//   constructor(){
//     this.searchEmployee$ = this.searchEmployeeSource.asObservable();
//   }
//   //Create a method that accepts a message from the search component and pushes the message as observable
//   searchForEmployee(msg: string | undefined){
//     console.log(msg + " searchForEmployee");
//     this.searchEmployeeSource.next(msg);
//   }
// }