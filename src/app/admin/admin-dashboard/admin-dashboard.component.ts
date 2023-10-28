import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/service/product.service';
import { AuthService } from 'src/app/service/auth.service';
@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  activeUsers: number = 0;
  inactiveUsers: number = 0;
  bestSellingProducts: any[] = [];
  totalRevenue: number = 0;

  constructor(private productService: ProductService, private authService: AuthService) {}

  ngOnInit(): void {
    // Fetch data for the admin dashboard
    this.productService.getActiveUsersCount().subscribe((count: number) => {
      this.activeUsers = count;
    });

    this.productService.getInactiveUsersCount().subscribe((count: number) => {
      this.inactiveUsers = count;
    });

    this.productService.getBestSellingProducts().subscribe((products: any[]) => {
      this.bestSellingProducts = products;
    });

    this.productService.getTotalRevenue().subscribe((revenue: number) => {
      this.totalRevenue = revenue;
    });
  }

  // Add any additional admin functionality here
  // For example, you can create methods to manage users or products.

  // You can also use the authService to check if the user is an admin.
  isAdmin(): boolean {
    return this.authService.isAdmin();
  }
}
