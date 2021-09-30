import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';
import { Observable } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class FirebaseProductService {
  private productsRef = firebase.firestore().collection("products");
  private categoryRef = firebase.firestore().collection("category");

  constructor() { }

  getProducts(): Observable<any> {
    return new Observable((observer) => {
      this.productsRef.onSnapshot((querySnapshot) => {
        let products = [];
        querySnapshot.forEach((doc) => {
          let data = doc.data();
          console.log(data)
          console.log(doc.id)
          let p = new Product(data.name, data.price, data.category, data.vegetarian, data.image, doc.id);

          if (data.image) {
            p.imagePath = data.image;
            const imageRef = firebase.storage().ref().child(data.image);

            imageRef.getDownloadURL()
              .then(url => {
                p.image = url;
              }).catch(error => {
                console.log('Error: Read image fail ' + error);
              });
          }

          if (data.specs) {
            p.specsPath = data.specs;
            const specsRef = firebase.storage().ref().child(data.specs);

            specsRef.getDownloadURL()
              .then(url => {
                p.specs = url;
              }).catch(error => {
                console.log('Error: Read specs fail ' + error);
              });
          }

          products.push(p);
        });
        observer.next(products);
      });
    });
  }


  getProductById(id: string): Observable<any> {
    return new Observable((observer) => {
      this.productsRef.doc(id).get().then((doc) => {
        let data = doc.data();

        let p = new Product(data.name, data.price, data.category, data.vegetarian, data.image, doc.id);
        // If there's image, read from Firebase Storage
        if (data.image) {
          p.imagePath = data.image;
          const imageRef = firebase.storage().ref().child(data.image);
          imageRef.getDownloadURL()
            .then(url => {
              p.image = url;
              // Tell the subscriber that image is updated
              observer.next(p);
              console.log('Image is ' + p.image);
            }).catch(error => {
              console.log('Error: Read image fail ' + error);
            });
        }
        if (data.specs) {
          p.specsPath = data.specs;
          const specsRef = firebase.storage().ref().child(data.specs);
          specsRef.getDownloadURL()
            .then(url => {
              p.specs = url;
              // Tell the subscriber that image is updated
              observer.next(p);
              console.log('Specs is ' + p.specs);
            }).catch(error => {
              console.log('Error: Read image fail ' + error);
            });
        }
        observer.next(p);
      });
    });
  }

  updateProduct(p: Product): Observable<any> {
    return new Observable((observer) => {
      this.productsRef.doc(p.id).set({
        name: p.name,
        price: p.price,
        category: p.category,
        vegetarian: p.vegetarian
      }).then(() => {
        observer.next(p);
      });
    });
  }

  deleteProduct(p: Product): Observable<any> {
    return new Observable((observer) => {
      this.productsRef.doc(p.id).delete().then(() => {
        observer.next(p);
      });
    });
  }

  addProduct(p: Product): Observable<any> {
    console.log("here");
    return new Observable((observer) => {
      this.productsRef.add({
        name: p.name,
        price: p.price,
        category: p.category,
        vegetarian: p.vegetarian
      }).then((doc) => {
        //         observer.next(p);
        if (p.image) {
          const dataUrl = p.image.changingThisBreaksApplicationSecurity;
          const imageRef = firebase.storage().ref().child(doc.id);
          imageRef.putString(dataUrl,
            firebase.storage.StringFormat.DATA_URL).then(() => {
              const ref = this.productsRef.doc(doc.id);
              ref.update({ image: doc.id });
            });
        }
        if (p.specs) {
          console.log("before="+p.specs);
          const dataUrl = p.specs;
//          const dataUrl = p.specs.changingThisBreaksApplicationSecurity;
          console.log("frebase dataUrl="+dataUrl);
          const specsRef = firebase.storage().ref().child(doc.id);
          specsRef.putString(dataUrl,
            firebase.storage.StringFormat.DATA_URL).then(() => {
              const ref = this.productsRef.doc(doc.id);
              ref.update({ specs: doc.id });
            });
        }
            });
    });
  }



  getCategories(): Observable<any> {
    return new Observable((observer) => {
      this.categoryRef.onSnapshot((querySnapshot) => {
        let categories = [];
        querySnapshot.forEach((doc) => {
          let data = doc.data();
          categories.push(data.name);
        });
        observer.next(categories);
      });
    });
  }

}
