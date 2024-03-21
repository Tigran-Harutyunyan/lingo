import { getLesson } from "@/db/queries";

export default defineEventHandler(async (event) => {
    const { auth } = await event.context;
    const { lessonId } = await getQuery(event);

    if (!(auth?.userId)) {
        throw createError({
            statusMessage: 'Unauthorized'
        });
    };

    try {
        return await getLesson ? getLesson(auth?.userId, Number(lessonId)) : getLesson(auth?.userId);

    } catch (error) {
        return {
            error: error?.message
        }
    }

});