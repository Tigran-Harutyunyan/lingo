import { getChallenges } from "@/db/admin-queries";

export default defineEventHandler(async (event) => {
    const { auth } = await event.context;

    if (!(auth.userId)) {
        throw createError({
            statusMessage: 'Unauthorized'
        });
    };

    try {
        const courses = await getChallenges();
        return courses;

    } catch (error) {
        return {
            error: error?.message
        }
    }

});