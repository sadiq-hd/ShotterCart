import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { ProductService } from '../service/product.service';
import { TranslateService } from '@ngx-translate/core';

import { ShoppingCartService } from '../service/shopping-cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean = false;
  isAdmin: boolean = false;
  isEmployee: boolean = false;
  isExternalSeller: boolean = false; // تم إضافة هذه المتغيرة
  isSeller: boolean = false; // تم إضافة هذه المتغيرة

  currentLanguage: string = 'ar';
  @ViewChild('languageMenu') languageMenu!: ElementRef;
 

  customDropdownClass = '';

  constructor(
    public authService: AuthService,
    private router: Router,
    private translate: TranslateService,
    private productService: ProductService,
    private shoppingCartService: ShoppingCartService
  ) {
    this.authService.loginStatusChanged.subscribe((status: boolean) => {
      this.isLoggedIn = status;
      this.checkAdminStatus();
      this.checkEmployeeStatus();
    });
  }

  ngOnInit(): void {
    this.checkLoginStatus();
    this.checkAdminStatus();
    this.checkEmployeeStatus();
    this.isExternalSeller = this.authService.isExternalSeller(); // تم استخدام الدالة هنا

    this.translate.setDefaultLang(this.currentLanguage);
    this.translate.use(this.currentLanguage);
  }

  checkLoginStatus() {
    this.isLoggedIn = this.authService.isloggedin();
  }
  
  checkAdminStatus() {
    this.isAdmin = this.authService.isAdmin();
  }

  checkEmployeeStatus() {
    this.isEmployee = this.authService.isEmployee();
  }
  checkExternalSeller(){
    this.isExternalSeller = this.authService.isExternalSeller();

  }
  

  logout() {
    this.authService.logout();
    this.router.navigate(['/home']);
  }

  changeLanguage(lang: string) {
    this.currentLanguage = lang;
    this.translate.use(lang);
  }

  toggleLanguageMenu() {
    this.languageMenu.nativeElement.classList.toggle('show');
  }
  addToCart(product: any) {
    this.shoppingCartService.addToCart(product);
  }
 
}
