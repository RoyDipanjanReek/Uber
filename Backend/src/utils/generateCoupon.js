export const generateCouponCode = () =>  { 
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'
    
    const couponCodeMinLength = 5
    const couponCodeMaxLength = 10

    const codeLength =
    Math.floor(Math.random() * (couponCodeMaxLength - couponCodeMinLength + 1)) +
    couponCodeMinLength;

    let couponCode = ''
    
    for (let i = 0; i < codeLength; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    couponCode += characters[randomIndex];
  }

  return couponCode

}