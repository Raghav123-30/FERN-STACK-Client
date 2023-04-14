class Actor {
    constructor(fullName, phone, address, adhar,location) {
      this.fullName = fullName;
      this.phone = phone;
      this.address = address;
      this.adhar = adhar;
      this.location = location;
    }
  
    validateFullName = () => {
      return this.fullName && this.fullName.length >= 3;
    };
  
    validatePhone = () => {
      return this.phone && this.phone.length === 10;
    };
  
    validateAddress = () => {
      return this.address && this.address.length >= 3;
    };
  
    validateAdhar = () => {
      return this.adhar && this.adhar.length === 12;
    };
    validateLocation = () => {
      return this.location;
    };
  
    getFullName = () => {
      return this.fullName;
    };
  }
  
  export default Actor;
  