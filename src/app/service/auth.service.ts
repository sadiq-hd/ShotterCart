import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }
  currentUser: any;

  private apiurl = 'http://localhost:3000/users';

  RegisterUser(inputdata: any) {
    return this.http.post(this.apiurl, inputdata);
  }

  GetUserbyCode(id: any) {
    return this.http.get(`${this.apiurl}/${id}`);
  }

  Getall() {
    return this.http.get(this.apiurl);
  }

  updateuser(id: any, inputdata: any) {
    return this.http.put(`${this.apiurl}/${id}`, inputdata);
  }

  getuserrole() {
    return this.http.get('http://localhost:3000/role');
  }

  private loginStatus = new Subject<boolean>();
  loginStatusChanged = this.loginStatus.asObservable();

  login(): void {
    // After verifying a successful login:
    this.loginStatus.next(true);
  }

  logout(): void {
    sessionStorage.clear();
    this.loginStatus.next(false);
  }

  isloggedin() {
    return sessionStorage.getItem('username') != null;
  }

  isExternalSeller(): boolean {
    return this.getrole() === 'ExternalSeller';
  }

  isAdmin(): boolean {
    return this.getrole() === 'admin';
  }
  isEmployee(): boolean {
    const userRole = this.getrole();
    return userRole === 'employee';
  }

  getrole() {
    return sessionStorage.getItem('role') || '';
  }

  GetAllCustomer() {
    return this.http.get('http://localhost:3000/customer');
  }

  Getaccessbyrole(role: any, menu: any) {
    return this.http.get(`http://localhost:3000/roleaccess?role=${role}&menu=${menu}`);
  }
  
  getUserOrders(userId: string) {
    return this.http.get(`${this.apiurl}/${userId}/orders`);
  }

  
}
