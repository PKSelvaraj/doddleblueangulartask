import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EmployeeDetailService } from '../services/employee.service';

@Component({
  selector: 'app-employee-delete-dialog',
  templateUrl: './employee-delete-dialog.component.html',
  styleUrls: ['./employee-delete-dialog.component.scss']
})
export class EmployeeDeleteDialogComponent implements OnInit {

  constructor(public deleteDialogRef: MatDialogRef<EmployeeDeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private employeeDetailService: EmployeeDetailService) {
  }

  ngOnInit(): void {
  }

  onDelete() {
    this.employeeDetailService.onDelete(this.dialogData.empId);
    this.deleteDialogRef.close(this.dialogData.empId)
  }

}
