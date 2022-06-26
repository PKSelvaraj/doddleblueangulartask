import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeDetailService } from '../services/employee.service';
import { EmployeeDetailModel } from '../model/add-employee.model';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

@Component({
  selector: 'app-employee-add',
  templateUrl: './employee-add.component.html',
  styleUrls: ['./employee-add.component.scss']
})
export class EmployeeAddComponent implements OnInit {

  public addEmployeeForm: FormGroup;
  public empIdReadonly: boolean = false;
  public maxDate = new Date();
  public checkingEditData: boolean = false;

  constructor(private fb: FormBuilder,
    private router: Router,
    private employeeDetailService: EmployeeDetailService) { }

  ngOnInit(): void {

    this.addEmployeeForm = this.fb.group(this.generateFormBuilder(new EmployeeDetailModel()));

    if (history.state.data) {
      this.empIdReadonly = true;
      this.checkingEditData = true;
      let editValue = history.state.data;

      if (editValue.dateOfBirth != null) {
        this.addEmployeeForm.controls['dateOfBirth'].patchValue(new Date(editValue.dateOfBirth));
      }
      if (editValue.dateOfJoining != null) {
        this.addEmployeeForm.controls['dateOfJoining'].patchValue(new Date(editValue.dateOfJoining));
      }

      this.addEmployeeForm.patchValue({
        empId: editValue.empId,
        name: editValue.name,
        gender: editValue.gender,
        mobileNo: editValue.mobileNo,
        mailId: editValue.mailId,
        companyName: editValue.companyName,
        age: editValue.age,
        martialStatus: editValue.martialStatus,
        city: editValue.city
      })
    }
  }

  generateFormBuilder(employeeDetails: EmployeeDetailModel) {
    return {
      empId: new FormControl(employeeDetails.empId),
      name: new FormControl(employeeDetails.name),
      gender: new FormControl(employeeDetails.gender),
      mobileNo: new FormControl(employeeDetails.mobileNo),
      mailId: new FormControl(employeeDetails.mailId, [Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
      dateOfBirth: new FormControl(employeeDetails.dateOfBirth),
      age: new FormControl(employeeDetails.age),
      companyName: new FormControl(employeeDetails.companyName),
      dateOfJoining: new FormControl(employeeDetails.dateOfJoining),
      martialStatus: new FormControl(employeeDetails.martialStatus),
      city: new FormControl(employeeDetails.city),
      isSelected: new FormControl(false),
      title: new FormControl(employeeDetails.title)
    }
  }
  //TO PREVENT TEXT IN NUMBER FIELDS:
  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  //CALCULATE AGE AND AUTO POPULATE IN AGE FIELD:
  calculateAge(event: MatDatepickerInputEvent<Date>) {
    var dob = new Date(event.value);
    var diff = Date.now() - dob.getTime();
    var age_dt = new Date(diff);
    this.addEmployeeForm.patchValue({
      age: Math.abs(age_dt.getUTCFullYear() - 1970)
    })
  }

  backToHome() {
    this.router.navigateByUrl('employee-list');
  }

  onSubmit() {
    if (this.addEmployeeForm.valid) {
      if (this.checkingEditData == true) {
        this.employeeDetailService.onUpdate(this.addEmployeeForm.value);
      }
      else {
        //TO GET TITLE TO PRINT IN CHAT IMAGE:
        let title = (this.addEmployeeForm.value.name.replace(/ /g, '').slice(0, 2)).toUpperCase();
        this.addEmployeeForm.value.title = title;
        this.employeeDetailService.onAdd(this.addEmployeeForm.value);
      }
      this.router.navigateByUrl('employee-list');
    }
  }

}
