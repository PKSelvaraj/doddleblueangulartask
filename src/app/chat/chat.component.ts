import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { ChatService } from '../services/chat-service';
import { EmployeeDetailService } from '../services/employee.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  public rowData: any;
  public employeeDetails: any;
  public chatComponentsShow: boolean = false;

  constructor(private employeeDetailService: EmployeeDetailService,
    private chatService: ChatService,
    private router: Router) { }

  ngOnInit(): void {
    this.rowData = JSON.parse(localStorage.getItem('senderRowData'));
    if (this.rowData == null) {
      this.router.navigateByUrl('/employee-list');
    }

    let employeeList = this.employeeDetailService.getList();
    this.employeeDetails = employeeList.filter(x => x.empId != this.rowData.empId);
  }

  backToList() {
    this.router.navigateByUrl('/employee-list');
  }

  //SELECTING EMPLOYEE TO CHAT:
  chooseReceiverEmployee(employee, isChecked) {
    if (isChecked == true) {
      this.chatComponentsShow = true;
      this.employeeDetails.filter(element => {
        if (element.empId == employee.empId) {
          element.isSelected = true;
          this.chatService.getReceiverRowData(employee);
        }
        else {
          element.isSelected = false;
        }
      });
    }
    else {
      localStorage.removeItem('receiverEmployee');
      this.chatComponentsShow = false;
    }
    this.chatService.getMessage('');
    this.chatService.getChatBMessage('');
  }
}
