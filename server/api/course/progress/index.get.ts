import { getCourseProgress } from "@/db/queries";

export default defineEventHandler(async (event) => {
    const { auth } = await event.context;

    if (!(auth.userId)) {
        throw createError({
            statusMessage: 'Unauthorized'
        });
    };

    try {
        const courseProgress = await getCourseProgress(auth.userId);

        return courseProgress || {};

    } catch (error) {
        return {
            error: error?.message
        }
    }

});