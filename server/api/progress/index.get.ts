import { getUserProgress } from "@/db/queries";

export default defineEventHandler(async (event) => {
    const { auth } = await event.context;

    if (!(auth.userId)) {
        throw createError({
            statusMessage: 'Unauthorized'
        });
    };

    try {
        const existingUserProgress = await getUserProgress(auth.userId);

        return existingUserProgress || {};

    } catch (error) {
        return {
            error: error?.message
        }
    }

});