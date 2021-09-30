import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../shared/models/product';
import { FirebaseProductService } from '../shared/services/firebase-product.service';
import { ProductService } from '../shared/services/product.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.page.html',
  styleUrls: ['./edit-product.page.scss'],
})
export class EditProductPage implements OnInit {
  product: Product;
  editProductForm: FormGroup;
  categories: string[];
  submitted: boolean = false;

  static positiveNumber(fc: FormControl) {
    if (fc.value <= 0) {
      return ({ positiveNumber: true });
    } else {
      return (null);
    }
  }

  constructor(private route: ActivatedRoute, private router: Router, private productService: FirebaseProductService) {
    //   this.product = this.productService.getProductById(this.route.snapshot.params.id);

    //this.categories = ['Main', 'Beverage', 'Dessert'];
    
    this.productService.getCategories()
      .subscribe(data => {
        this.categories = data;
      })
    if (this.product == undefined) {
      this.product = new Product('', 0, '', false, null, null);
    }

    this.editProductForm = new FormGroup({
      name: new FormControl(this.product.name, [Validators.required]),
      price: new FormControl(this.product.price, [EditProductPage.positiveNumber]),
      category: new FormControl(this.product.category, [Validators.required]),
      vegetarian: new FormControl(this.product.vegetarian)
    });

    this.productService.getProductById(this.route.snapshot.params.id)
      .subscribe(data => {
        this.product = data;
        if (this.product) {
          //this.productImage = this.product.image;
          this.editProductForm.controls.name.setValue(this.product.name);
          this.editProductForm.controls.price.setValue(this.product.price);
          this.editProductForm.controls.category.setValue(this.product.category);
          this.editProductForm.controls.vegetarian.setValue(this.product.vegetarian);
        }
      });






  }

  ngOnInit() {
  }

  update() {
    this.submitted = true;

    if (this.editProductForm.valid) {
      const prod = new Product(
        this.editProductForm.value.name,
        this.editProductForm.value.price,
        this.editProductForm.value.category,
        this.editProductForm.value.vegetarian,
        null,
        this.product.id); // Use name as id
        prod.imagePath = this.product.imagePath
        prod.specsPath = this.product.specsPath

      //this.productService.update(prod);
      this.productService.updateProduct(prod).subscribe();
      this.router.navigate(['tabs/tab2']);
    }
  }

}
