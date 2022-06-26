import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { EmployeeDetailService } from '../services/employee.service';
import { EmployeeDeleteDialogComponent } from '../employee-delete-dialog/employee-delete-dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {


  displayedColumns: string[] = ['empId', 'name', 'mobileNo', 'mailId', 'companyName', 'edit', 'delete', 'chat'];
  public dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  private deleteDialogRef: MatDialogRef<EmployeeDeleteDialogComponent>;
  public searchKey: string;

  constructor(private employeeDetailService: EmployeeDetailService,
    private router: Router,
    private cdRef: ChangeDetectorRef,
    private matDialog: MatDialog) { }

  ngOnInit(): void {
    //REMOVEING LOCAL STORAGE VALUES: 
    localStorage.removeItem('senderRowData');
  }

  ngAfterViewInit() {
    this.dataSource = null;
    this.loadEmployeeList();
  }

  loadEmployeeList() {
    this.dataSource = new MatTableDataSource(this.employeeDetailService.getList());
    this.cdRef.markForCheck();
    this.dataSource.paginator = this.paginator;
  }

  applyFilter() {
    this.dataSource.filter = this.searchKey.trim().toLowerCase();
  }

  clearSearch() {
    this.searchKey = "";
    this.applyFilter();
  }

  addEmployee() {
    this.router.navigateByUrl('employee-add');
  }

  editEmployee(row) {
    this.router.navigate(['employee-add'], { state: { data: row } });
  }

  moveToChatPage(row) {
    localStorage.setItem('senderRowData', JSON.stringify(row));
    this.router.navigate(['/chat'], { state: { data: row } });
  }

  deleteEmployee(row) {
    this.deleteDialogRef = this.matDialog.open(EmployeeDeleteDialogComponent, {
      data: {
        empId: row.empId
      }
    });
    this.deleteDialogRef.beforeClosed().subscribe(data => {
      if (data) {
        this.loadEmployeeList();
      }
    })
  }
}
