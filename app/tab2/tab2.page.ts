import { Component } from '@angular/core';
import { Product } from '../shared/models/product';
import { FirebaseProductService } from '../shared/services/firebase-product.service';
import { ProductService } from '../shared/services/product.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  products: Product[] = [];

  constructor(private productService: FirebaseProductService) {
    this.productService.getProducts()
      .subscribe(data => {
        //console.log(data);
        this.products = data;
      });
  }

  delete(item: Product) {
    this.productService.deleteProduct(item).subscribe();
  }
  
}
