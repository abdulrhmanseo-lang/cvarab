
/**
 * BACKEND API FILE (Node.js / Express or Next.js API Route)
 * This file handles Moyasar Webhooks to update user subscriptions securely.
 */

// import { prisma } from "../lib/prisma"; // Example DB client

export default async function webhookHandler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed');
  }

  const payment = req.body;

  // 1. Verify payment status
  if (payment.status !== 'paid') {
    return res.status(200).send('Payment not paid');
  }

  // 2. Extract metadata
  const { userId, plan } = payment.metadata || {};

  if (!userId || !plan) {
    return res.status(400).send('Missing metadata');
  }

  console.log(`Processing subscription for User ${userId} - Plan ${plan}`);

  try {
    // 3. Update User in Database
    /*
    await prisma.user.update({
      where: { id: userId },
      data: {
        plan: plan,
        subscriptionActive: true,
        subscriptionEnds: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // +30 Days
        billingHistory: {
          create: {
             amount: payment.amount / 100,
             status: 'paid',
             paymentId: payment.id,
             date: new Date()
          }
        }
      }
    });
    */

    res.status(200).send('Webhook processed');
  } catch (error) {
    console.error("Webhook Error:", error);
    res.status(500).send('Internal Server Error');
  }
}
