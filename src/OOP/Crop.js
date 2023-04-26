class Crop {
  constructor(crop, mode, trayCapacity, serviceCharge, duration) {
    this.crop = crop;
    this.mode = mode;
    this.serviceCharge = serviceCharge;
    this.trayCapacity = trayCapacity;
    this.duration = duration;
  }

  validatecrop = () => {
    if (this.crop) {
      return true;
    }
  };

  validatemode = () => {
    return this.mode;
  };

  validateserviceCharge = () => {
    return this.serviceCharge > 0;
  };

  validatetrayCapacity = () => {
    return this.trayCapacity > 0;
  };

  validateDuration = () => {
    return this.duration > 0;
  };

  getcrop = () => {
    return this.crop;
  };
}

export default Crop;
