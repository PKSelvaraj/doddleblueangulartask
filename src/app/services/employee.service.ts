import { ChangeDetectorRef, Injectable } from "@angular/core";
import { EmployeeListModel } from '../model/employee.model';

@Injectable({
    providedIn: 'root'
})

export class EmployeeDetailService {

    public employeeDetails: any;

    constructor() { }

    employee: EmployeeListModel[] = [
        {
            empId: 'D-10',
            name: 'Selvaraj K',
            gender: 'M',
            mobileNo: 8940855123,
            mailId: 'rajselva@gmail.com',
            dateOfJoining: '30 Jun 2022',
            dateOfBirth: '15 Jan 1997',
            age: 25,
            martialStatus: 'U',
            companyName: 'Doodleblue',
            city: 'Tiruppur',
            isSelected: false,
            title: 'SK'
        },
        {
            empId: 'D-11',
            name: 'Vinoth L',
            gender: 'M',
            mobileNo: 9404305683,
            mailId: 'vinoth12@gmail.com',
            dateOfJoining: '24 Jun 2015',
            dateOfBirth: '19 Sep 1990',
            age: 30,
            martialStatus: 'M',
            companyName: 'Sensure',
            city: 'Chennai',
            isSelected: false,
            title: 'SK'
        },
        {
            empId: 'D-12',
            name: 'Mia D',
            gender: 'F',
            mobileNo: 8940890808,
            mailId: 'mia97@gmail.com',
            dateOfJoining: '20 Dec 2019',
            dateOfBirth: '05 Mar 1997',
            age: 25,
            martialStatus: 'U',
            companyName: 'TCS',
            city: 'Chennai',
            isSelected: false,
            title: 'SK'
        },
        {
            empId: 'D-13',
            name: 'Kumar S',
            gender: 'M',
            mobileNo: 9012655123,
            mailId: 'kumargoku@gmail.com',
            dateOfJoining: '28 Jan 2022',
            dateOfBirth: '19 Jul 2000',
            age: 21,
            martialStatus: 'U',
            companyName: 'Infosys',
            city: 'Coimbatre',
            isSelected: false,
            title: 'SK'
        },
        {
            empId: 'D-14',
            name: 'Meera V',
            gender: 'F',
            mobileNo: 8958534590,
            mailId: 'meeralife@gmail.com',
            dateOfJoining: '03 Feb 2021',
            dateOfBirth: '10 Feb 1995',
            age: 27,
            martialStatus: 'M',
            companyName: 'CTS',
            city: 'Chennai',
            isSelected: false,
            title: 'SK'
        },
    ]

    getList() {
        let localData = JSON.parse(localStorage.getItem('empList'));
        this.employeeDetails = localData ? localData : this.employee;
        return this.employeeDetails;
    }

    onAdd(data: EmployeeListModel) {
        this.employeeDetails.push(data);
        localStorage.setItem('empList', JSON.stringify(this.employeeDetails));
    }

    onUpdate(data: EmployeeListModel) {
        let emp = this.employeeDetails.find(x => x.empId == data.empId);
        emp.empId = data.empId;
        emp.name = data.name;
        emp.gender = data.gender;
        emp.mobileNo = data.mobileNo;
        emp.mailId = data.mailId;
        emp.companyName = data.companyName;
        emp.dateOfBirth = data.dateOfBirth;
        emp.age = data.age;
        emp.martialStatus = data.martialStatus;
        emp.dateOfJoining = data.dateOfJoining;
        emp.city = data.city;
        localStorage.setItem('empList', JSON.stringify(this.employeeDetails));
    }

    onDelete(empId: string) {
        let employee = this.employeeDetails.find(x => x.empId == empId);
        let index = this.employeeDetails.indexOf(employee, 0);
        this.employeeDetails.splice(index, 1);
        localStorage.setItem('empList', JSON.stringify(this.employeeDetails));
    }
}