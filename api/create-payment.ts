
/**
 * BACKEND API FILE (Node.js / Express or Next.js API Route)
 * This file contains the server-side logic to create a Moyasar payment.
 */

import axios from "axios";

// In a real backend, these would come from process.env
// const MOYASAR_SECRET_KEY = process.env.MOYASAR_SECRET_KEY;
// const MOYASAR_API_URL = "https://api.moyasar.com/v1/payments";

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { plan, userId } = req.body;

  const priceMap: Record<string, number> = {
    basic: 2900,        // 29 SAR
    pro: 4900,          // 49 SAR
    guaranteed: 19900,  // 199 SAR
  };

  const amount = priceMap[plan];

  if (!amount) {
    return res.status(400).json({ message: "Invalid plan selected" });
  }

  try {
    const response = await axios.post(
      "https://api.moyasar.com/v1/payments",
      {
        amount: amount,
        currency: "SAR",
        description: `Score CV Subscription - ${plan.toUpperCase()}`,
        // Replace with your actual domain
        callback_url: `https://your-domain.com/payment/callback?plan=${plan}`, 
        source: {
          type: "creditcard",
          name: "Score CV Customer", // In production, get from user input
          number: "4111111111111111", // Test card
          cvc: "123",
          month: "12",
          year: "30",
        },
        metadata: {
          userId,
          plan
        }
      },
      {
        auth: {
          username: process.env.MOYASAR_SECRET_KEY || '',
          password: "",
        },
      }
    );

    res.status(200).json({ url: response.data.source.transaction_url });
  } catch (error: any) {
    console.error("Moyasar Error:", error.response?.data || error.message);
    res.status(500).json({ message: "Payment creation failed" });
  }
}
