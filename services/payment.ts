
import { Plan } from "../types";
import { config } from "../config";

export const initiatePayment = async (plan: Plan, userId: string): Promise<void> => {
  console.log(`Initiating payment for plan: ${plan}, User: ${userId}`);

  // In a real production app, we would call the backend API:
  /*
  const response = await fetch("/api/create-payment", {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ plan, userId }),
  });
  const data = await response.json();
  window.location.href = data.url;
  */

  // --- MOCK SIMULATION FOR DEMO ---
  // Since we don't have a running backend in this preview environment,
  // we will simulate the redirect to the callback page as if Moyasar processed it.
  
  return new Promise((resolve) => {
    setTimeout(() => {
      // Simulate successful payment redirect
      const mockPaymentId = "pay_" + Math.random().toString(36).substr(2, 9);
      const callbackUrl = `${config.moyasar.callbackUrl}?status=paid&id=${mockPaymentId}&message=APPROVED&plan=${plan}`;
      window.location.href = callbackUrl;
      resolve();
    }, 1500);
  });
};
