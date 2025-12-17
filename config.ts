
export const config = {
  moyasar: {
    publicKey: "pk_test_1KYKJzVPdM7heck2tCXCtp3y7U2SpvQy48zSi3pd",
    apiUrl: "https://api.moyasar.com/v1/payments",
    callbackUrl: typeof window !== 'undefined' ? `${window.location.origin}/#/payment/callback` : 'http://localhost:3000/#/payment/callback'
  }
};
