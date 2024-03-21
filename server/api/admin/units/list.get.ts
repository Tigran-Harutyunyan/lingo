
import { getUnits } from "@/db/admin-queries";

export default defineEventHandler(async (event) => {
    const { auth } = await event.context;

    if (!(auth.userId)) {
        throw createError({
            statusMessage: 'Unauthorized'
        });
    };

    try {
        return await getUnits();

    } catch (error) {
        return {
            error: error?.message
        }
    }

});