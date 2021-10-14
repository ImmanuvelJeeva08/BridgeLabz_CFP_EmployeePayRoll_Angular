import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Employee } from 'src/app/model/employee';
import { DataService } from 'src/app/service/data.service';
import { HttpService } from 'src/app/service/http.service';

@Component({
  selector: 'app-home', 
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public employeeCount: number = 10;
  public employeeDetails: Employee[] = [];
  term: string;

  constructor(
    private httpService: HttpService,
    private router: Router,
    private dataService: DataService,
    public dialog: MatDialog
  ) {}

  /**
   * When the getEmployeeData() is hit, all employee details is populated from the database to the HOME page.
   */

  ngOnInit(): void {
    this.httpService.getEmployeeData().subscribe(data=> {
      this.employeeDetails = data.data;
      this.employeeCount = this.employeeDetails.length;
    });
  }

  /**
   * When the remove() is hit, the employee gets deleted from the database and also the details is removed from the HOME page.
   * Thus, a refreshed home page is rendered and a remove message is displayed to the user.
   * 
   * @param id remove() is invoked for a particular employee id.
   */
  

  remove(id: number) {
    console.log(id);
    this.httpService.deleteEmployeeData(id).subscribe(data=> {
      console.log(data);
      this.ngOnInit();      
    });
  }
  
  /**
   * When the update() is hit, data of a particular id is fetched using the changeEmployee().
   * The page gets navigated to the add page along with the id in the URL and employee object in the body.
   * 
   * @param employee object data to be updated for a particular employee id.
   */

  update(employee: Employee) {
    console.log(employee); 
    console.log(employee.empId);
    this.dataService.changeEmployee(employee);  
    this.router.navigateByUrl('/edit/' +employee.empId);
    // this.router.navigate(['/edit',employee.empId]);
    // this.httpService.updateEmployeeData(employee.empId,employee).subscribe(status => console.log(status));

  }
}
