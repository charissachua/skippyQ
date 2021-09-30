import { Component, ViewChild } from '@angular/core';
import { IonSearchbar, ToastController } from '@ionic/angular';
import { Product } from '../shared/models/product';
import { FirebaseProductService } from '../shared/services/firebase-product.service';
import { ProductService } from '../shared/services/product.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  products: Product[] = [];
  @ViewChild('searchBar', { static: false }) searchBar: IonSearchbar;


  constructor(private productService: ProductService,private fbproductService: FirebaseProductService, private toastController: ToastController, private sanitizer: DomSanitizer) {
    this.products = this.productService.getProducts();
  }

  async addToCart(item: Product) {
    console.log(item.image);
    item.image = this.sanitizer.bypassSecurityTrustResourceUrl(item.image && (item.image.dataUrl));
    //this.fbproductService.addProduct(item).subscribe();
    const toast = await this.toastController.create({
      message: item.name + ' added to cart',
      duration: 2000,
      position: 'top',
      color: 'secondary'
    });
    toast.present();
  }

  async addToFav(item: Product) {
    const toast = await this.toastController.create({
      message: item.name + ' added to favourite',
      duration: 2000,
      position: 'top',
      color: 'secondary'
    });
    toast.present();
  }

  search(event) {
    const text = event.target.value;
    const allProducts = this.productService.getProducts();

    if (text && text.trim() !== '') {
      this.products = allProducts.filter(
        item => item.name.toLowerCase().includes(text.toLowerCase()));
    } else {
      // Blank text, clear the search, show all products
      this.products = allProducts;
    }
  }

  refresh(event) {
    this.searchBar.value = '';
    event.target.complete();
  }
}
