import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-main-login',
  templateUrl: './main-login.component.html',
  styleUrls: ['./main-login.component.css'],

})
export class MainLoginComponent {

  constructor(private builder: FormBuilder, private toastr: ToastrService, private service: AuthService,
    private router: Router) {
   
  }

  result: any;
  loginForm = this.builder.group({
    id: this.builder.control('', [Validators.required]),
    password: this.builder.control('', Validators.required)
  });

  
  // الدالة التي تتم استدعاؤها عند تقديم النموذج
  proceedlogin() {
    // التحقق من صحة النموذج
    if (this.loginForm.valid) {

      // الاستعلام عن المستخدم باستخدام الخدمة
      this.service.GetUserbyCode(this.loginForm.value.id).subscribe(item => {
        this.result = item;

        // التحقق من مطابقة كلمة المرور
        if (this.result && this.result.password === this.loginForm.value.password) {

          // التحقق من نشاط المستخدم
          if (!this.result.isactive) {
            this.toastr.error('Please contact Admin', 'InActive User');
            return;
          }

          // حفظ بيانات المستخدم في sessionStorage
          sessionStorage.setItem('username', this.result.id);
          sessionStorage.setItem('role', this.result.role);

          // قم بإضافة هذا السطر داخل دالة proceedlogin بعد التحقق من صحة المستخدم وقبل التوجيه
          this.service.login();


          // التوجيه إلى الصفحة المناسبة بناءً على دور المستخدم
          switch (this.result.role) {
            case 'users':
              this.router.navigate(['home']);
              break;
            case 'seller':
              this.router.navigate(['external-seller-home']); 
              break;
              case 'admin':
                this.router.navigate(['/admin-dashboard']); 
                break;

            default:
              this.router.navigate(['home']); 
          }

   

        } else {
          this.toastr.error('Invalid credentials');
        }
      });

    } else {
      this.toastr.warning('Please enter valid data.');
    }
  }
}