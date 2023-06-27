import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FetchApiDataService } from '../fetch-api-app.service';
import { Router } from '@angular/router';
import { formatDate } from '@angular/common';
import * as rxjs from 'rxjs';
import * as operators from 'rxjs';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})

export class UserProfileComponent implements OnInit {

  user: any = {};
  favorites: any[] = [];

  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };

  constructor(
    public fetchApiData: FetchApiDataService,
    //public dialogRef: MatDialogRef<UserProfileComponent>,
    public snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getUser();
  }

  /**
   * Gets the user info and favorite movies from the API.
   */
  getUser(): void {
    this.fetchApiData.getOneUser().subscribe((user: any) => {
    this.user = user;
    this.userData.Username = user.Username;
    this.userData.Email = user.Email;
    this.userData.Birthday = formatDate(user.Birthday, 'yyyy-MM-dd', 'en-US', 'UTC+0');
    
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.favorites = resp.filter((m: { _id: any; }) => 
      this.user.favoriteMovieList.indexOf(m._id) >= 0);
    });
    });
  }
  
  /**
   *Calls the API to update the user info.
   */
  editUser(): void {
    this.fetchApiData.editUser(this.userData).subscribe((result) => {
      localStorage.setItem('user', JSON.stringify(result));

      this.snackBar.open('User successfully updated', 'OK', {
        duration: 2000
      });
    }, (result) => {
      this.snackBar.open(result, 'OK', {
        duration: 2000
      });
    });
  }

  /**
  *Calls the API to delete the user.
  */
  deleteUser(): void {
    this.fetchApiData.deleteUser().subscribe((result) => {
      localStorage.clear();
      this.router.navigate(['welcome']);
      this.snackBar.open('User successfully deleted', 'OK', {
        duration: 2000
      });
    }, (result) => {
      this.snackBar.open(result, 'OK', {
        duration: 2000
      });
    });
  }
}