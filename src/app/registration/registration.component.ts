import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
  providers: [AuthService]
})
export class RegistrationComponent implements OnInit {

  registrationForm!: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private toastr: ToastrService, private router: Router) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.registrationForm = this.fb.group({
      role: ['customer'],
      email: ['', [Validators.required, Validators.email]],
      id: ['', [Validators.required, Validators.minLength(5)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      gender: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^\d{7,9}$/)]],
      address: ['', Validators.required],
      storeName: [''],
      storeDescription: ['']
    });
  }

  proceedregister() {
    if (this.registrationForm.valid) {
      this.authService.RegisterUser(this.registrationForm.value).subscribe(result => {
        this.toastr.success('Registered successfully');
        this.router.navigate(['login']);
      }, error => {
        this.toastr.warning('Error during registration.');
      });
    } else {
      this.toastr.warning('Please enter valid data.');
    }
  }
}
