
import db from "@/db/drizzle";

export default defineEventHandler(async (event) => {
    const { auth } = await event.context;

    if (!(auth.userId)) {
        throw createError({
            statusMessage: 'Unauthorized'
        });
    };

    try {

        const data = await db.query.userProgress.findMany({
            orderBy: (userProgress, { desc }) => [desc(userProgress.points)],
            limit: 10,
            columns: {
                userId: true,
                userName: true,
                userImageSrc: true,
                points: true,
            },
        });


        return data;

    } catch (error) {
        return {
            error: error?.message
        }
    }

});