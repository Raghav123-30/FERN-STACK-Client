class Actor {
    constructor(fullName, phone, address, adhar) {
      this.fullName = fullName;
      this.phone = phone;
      this.address = address;
      this.adhar = adhar;
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
  
    getFullName = () => {
      return this.fullName;
    };
  }
  
  export default Actor;
  