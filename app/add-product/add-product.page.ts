import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from '../shared/models/product';
import { FirebaseProductService } from '../shared/services/firebase-product.service';
import { ProductService } from '../shared/services/product.service';
import { Plugins, CameraResultType, CameraSource } from '@capacitor/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.page.html',
  styleUrls: ['./add-product.page.scss'],
})
export class AddProductPage implements OnInit {
  addProductForm: FormGroup;
  categories: string[];
  submitted: boolean = false;
  photo: SafeResourceUrl;
  specs: SafeResourceUrl;

  static positiveNumber(fc: FormControl) {
    if (fc.value <= 0) {
      return ({ positiveNumber: true });
    } else {
      return (null);
    }
  }
  constructor(private router: Router, private productService: FirebaseProductService, private sanitizer: DomSanitizer) {
    //this.categories = ['Main', 'Beverage', 'Dessert'];
    this.productService.getCategories()
      .subscribe(data => {
        this.categories = data;
      })

    this.addProductForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      price: new FormControl(0, [AddProductPage.positiveNumber]),
      category: new FormControl('', [Validators.required]),
      vegetarian: new FormControl(true)
    });
  }

  ngOnInit() {
  }

  add() {
    this.submitted = true;

    if (this.addProductForm.valid) {
      const prod = new Product(
        this.addProductForm.value.name,
        this.addProductForm.value.price,
        this.addProductForm.value.category,
        this.addProductForm.value.vegetarian,
        this.photo,
        this.specs);

      this.productService.addProduct(prod).subscribe();

      this.router.navigate(['tabs/tab2']);
    }
  }

  async takePhoto() {
    const image = await Plugins.Camera.getPhoto({
      quality: 100,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera
    });
    this.photo =
      this.sanitizer.bypassSecurityTrustResourceUrl(image &&
        (image.dataUrl));
  }

  loadSpecsFromDevice(event) {

    const file = event.target.files[0];
  
    const reader = new FileReader();
  
    reader.readAsDataURL(file);
  
    reader.onload = () => { // note using fat arrow function here if we intend to point at current Class context.
  
      this.specs = reader.result;

    };
  
    reader.onerror = (error) => {
  
      //handle errors
    };
  };
}
