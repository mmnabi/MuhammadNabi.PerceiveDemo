import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { RepositoryService } from '../../shared/repository.service';
import { ErrorHandlerService } from '../../shared/services/error-handler.service';
import { UserListDto } from '../../_interfaces/user/userListDto';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit, AfterViewInit {

  public displayedColumns = ['userName', 'email', 'dateOfBirth', 'details', 'update', 'delete'];

  public dataSource = new MatTableDataSource<UserListDto>();

  @ViewChild(MatSort)
    sort!: MatSort;

  @ViewChild(MatPaginator)
    paginator!: MatPaginator;

  constructor(private repoService: RepositoryService,
    private errorService: ErrorHandlerService, private router: Router) { }

  ngOnInit(): void {
    this.getAllOwners();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  public getAllOwners = () => {
    this.repoService.getData('api/users')
      .subscribe(res => {
        this.dataSource.data = res as UserListDto[];
      },
      (error) => {
        this.errorService.handleError(error);
      });
  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  public redirectToDetails = (id: string) => {
    let url: string = `/users/details/${id}`;
    this.router.navigate([url]);
  }
  public redirectToUpdate = (id: string) => {

  }
  public redirectToDelete = (id: string) => {

  }

}
