import db from "@/db/drizzle";

export default defineEventHandler(async (event) => {
    const { auth } = await event.context;

    if (!(auth?.userId)) {
        throw createError({
            statusMessage: 'Unauthorized'
        });
    };

    try {
        const courses = await db.query.courses.findMany();
        return courses;

    } catch (error) {
        return {
            error: error?.message
        }
    }

});