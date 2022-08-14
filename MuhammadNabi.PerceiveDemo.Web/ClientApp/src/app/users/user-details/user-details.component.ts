import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RepositoryService } from '../../shared/repository.service';
import { ErrorHandlerService } from '../../shared/services/error-handler.service';
import { UserListDto } from '../../_interfaces/user/userListDto';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  public user!: UserListDto;

  constructor(private repository: RepositoryService, private router: Router,
    private activeRoute: ActivatedRoute, private errorHandler: ErrorHandlerService) { }

  ngOnInit(): void {
    this.getUserDetails();
  }

  private getUserDetails = () => {
    let id: string = this.activeRoute.snapshot.params['id'];
    let apiUrl: string = `api/users/${id}`;

    this.repository.getData(apiUrl)
      .subscribe(res => {
        this.user = res as UserListDto;
      },
        (error) => {
          this.errorHandler.handleError(error);
        });
  }

}
