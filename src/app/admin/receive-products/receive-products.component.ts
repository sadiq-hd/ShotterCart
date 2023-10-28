import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-receive-products',
  templateUrl: './receive-products.component.html',
  styleUrls: ['./receive-products.component.css']
})
export class ReceiveProductsComponent implements OnInit {
  products: any[] = []; // قائمة المنتجات المرسلة للموافقة

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.getProductsForApproval();
  }

  getProductsForApproval() {
    this.productService.getProductsForApproval().subscribe((data: any) => {
      this.products = data;
    });
  }

  approveProduct(productId: number) {
    this.productService.approveProduct(productId).subscribe(() => {
      this.getProductsForApproval(); // إعادة تحميل القائمة بعد الموافقة
    });
  }

  rejectProduct(productId: number) {
    this.productService.rejectProduct(productId).subscribe(() => {
      this.getProductsForApproval(); // إعادة تحميل القائمة بعد الرفض
    });
  }
}
