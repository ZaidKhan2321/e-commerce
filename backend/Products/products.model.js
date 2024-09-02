export default class ProductModel{
    id ;
    constructor(pName, price, desc, imagePath, owner){
        this.productName = pName ;
        this.productPrice = price ;
        this.productDescription = desc ;
        this.productImagePath = imagePath ;
        this.productOwner = owner ;
    }
} ;