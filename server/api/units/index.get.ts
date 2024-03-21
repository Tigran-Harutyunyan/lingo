import { getUnits } from "@/db/queries";

export default defineEventHandler(async (event) => {
    const { auth } = await event.context;

    if (!(auth.userId)) {
        throw createError({
            statusMessage: 'Unauthorized'
        });
    };

    try {
        const units = await getUnits(auth.userId);

        return units;

    } catch (error) {
        return {
            error: error?.message
        }
    }

});