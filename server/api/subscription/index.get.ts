import { getUserSubscription } from "@/db/queries";

export default defineEventHandler(async (event) => {
    const { auth } = await event.context;

    if (!(auth.userId)) {
        throw createError({
            statusMessage: 'Unauthorized'
        });
    };

    try {
        const subscription = await getUserSubscription(auth.userId);

        return subscription || {};

    } catch (error) {
        return {
            error: error?.message
        }
    }

});