export class Product {
    name: string;
    price: number;
    image;
    imagePath: string;
    id: string;
    category: string;
    vegetarian: boolean;
    specs;
    specsPath: string;

    constructor(name: string, price: number, category: string, vegetarian: boolean, image, specs, id?:string) {
        this.name = name;
        this.price = price;
        this.id = id;
        this.category = category;
        this.vegetarian = vegetarian;
        this.image = image;
        this.specs = specs
    }

}