class Product {
    constructor(productName, rack, section, tray) {
      this.productName = productName;
      this.rack = rack;
      this.section = section;
      this.tray = tray;
      
    }
  
    validateProductName = () => {
      return this.productName && this.productName.length >= 3;
    };
  
    validateRack = () => {
      return this.rack > 0;
    };
  
    validateSection = () => {
      return this.section > 0;
    };
  
    validateTray = () => {
      return this.tray > 0;
    };
   
    getProductName = () => {
      return this.productName;
    };
    
  }
  
  export default Product;
  