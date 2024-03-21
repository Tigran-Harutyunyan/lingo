
import Stripe from "stripe";
import { getUserSubscription } from "@/db/queries";

const STRIPE_API_KEY = useRuntimeConfig().stripeKey as string;
const APP_URL = useRuntimeConfig().public.appUrl as string;

const stripe = new Stripe(STRIPE_API_KEY, {
    apiVersion: "2023-10-16",
    typescript: true,
});

import { clerkClient } from 'h3-clerk';

export default defineEventHandler(async (event) => {

    const { auth } = event.context;

    if (!auth?.userId) {
        return createError({
            statusCode: 401,
            statusMessage: "Unauthorized"
        })
    };

    const user = await clerkClient.users.getUser(auth?.userId);

    const returnUrl = `${APP_URL}/shop/`;

    try {

        const userSubscription = await getUserSubscription(auth.userId);

        if (userSubscription && userSubscription.stripeCustomerId) {
            const stripeSession = await stripe.billingPortal.sessions.create({
                customer: userSubscription.stripeCustomerId,
                return_url: returnUrl,
            });

            return { data: stripeSession.url };
        }

        const stripeSession = await stripe.checkout.sessions.create({
            mode: "subscription",
            payment_method_types: ["card"],
            customer_email: user.emailAddresses[0].emailAddress,
            line_items: [
                {
                    quantity: 1,
                    price_data: {
                        currency: "USD",
                        product_data: {
                            name: "Lingo Pro",
                            description: "Unlimited Hearts",
                        },
                        unit_amount: 2000, // $20.00 USD
                        recurring: {
                            interval: "month",
                        },
                    },
                },
            ],
            metadata: {
                userId: auth?.userId,
            },
            success_url: returnUrl,
            cancel_url: returnUrl,
        });

        return { url: stripeSession.url }
    } catch (error) {
        console.log("[STRIPE]", error);
        createError({
            statusCode: 500,
            statusMessage: "Internal Error"
        })
    }

});
