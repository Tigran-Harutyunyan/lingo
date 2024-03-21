import db from "@/db/drizzle";
import { eq } from "drizzle-orm";
import { userSubscription } from "@/db/schema";
import Stripe from "stripe";
import { defineStripeWebhook } from '@fixers/nuxt-stripe/server';

/**
 * @param event - the H3 event
 * @param stipe - the Stripe instance
 * @param stripeEvent - the Stripe Webhook event
 */

const STRIPE_API_KEY = useRuntimeConfig().stripeKey as string;

const WEBHOOK_SECRET = useRuntimeConfig().stripeWebhookSecret

const stripe = new Stripe(STRIPE_API_KEY, {
  apiVersion: "2023-10-16"
});

const webhookOptions = {
  webhookSecret: WEBHOOK_SECRET,
  stripe,
}

export default defineStripeWebhook(async ({ event, stripeEvent }) => {

  if (!isMethod(event, ['POST'])) {
    setResponseStatus(event, 400)

    return { ok: false }
  }

  const session = stripeEvent.data.object as Stripe.Checkout.Session;

  switch (stripeEvent.type) {
    case 'checkout.session.completed': {
      const subscription = await stripe.subscriptions.retrieve(
        session.subscription as string
      );

      if (!session?.metadata?.userId) {
        createError({
          statusCode: 400,
          statusMessage: 'User id is required'
        });
      }

      await db.insert(userSubscription).values({
        userId: session.metadata.userId,
        stripeSubscriptionId: subscription.id,
        stripeCustomerId: subscription.customer as string,
        stripePriceId: subscription.items.data[0].price.id,
        stripeCurrentPeriodEnd: new Date(
          subscription.current_period_end * 1000,
        ),
      });
    }
    case 'invoice.payment_succeeded': {
      const subscription = await stripe.subscriptions.retrieve(
        session.subscription as string
      );

      await db.update(userSubscription).set({
        stripePriceId: subscription.items.data[0].price.id,
        stripeCurrentPeriodEnd: new Date(
          subscription.current_period_end * 1000,
        ),
      }).where(eq(userSubscription.stripeSubscriptionId, subscription.id))
    }

    case 'customer.subscription.updated': {
      const object = stripeEvent?.data?.object;

      if (object?.canceled_at && object?.id) {
        await await db.delete(userSubscription)
          .where(eq(userSubscription.stripeSubscriptionId, object?.id)).returning();
      }
    }

  }

  return {
    hello: 'world'
  }

}, webhookOptions); 