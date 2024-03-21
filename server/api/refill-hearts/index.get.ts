import db from "@/db/drizzle";
import { eq } from "drizzle-orm";

import { getUserProgress } from "@/db/queries";
import { POINTS_TO_REFILL } from "@/constants";
import { userProgress } from "@/db/schema";


export default defineEventHandler(async (event) => {
    const { auth } = await event.context;

    if (!(auth.userId)) {
        throw createError({
            statusMessage: 'Unauthorized'
        });
    };

    try {
        const currentUserProgress = await getUserProgress(auth.userId);

        if (!currentUserProgress) {
            throw new Error("User progress not found");
        }

        if (currentUserProgress.hearts === 5) {
            throw new Error("Hearts are already full");
        }

        if (currentUserProgress.points < POINTS_TO_REFILL) {
            throw new Error("Not enough points");
        }

        await db.update(userProgress).set({
            hearts: 5,
            points: currentUserProgress.points - POINTS_TO_REFILL,
        }).where(eq(userProgress.userId, currentUserProgress.userId));

        return await getUserProgress(auth.userId);


    } catch (error) {
        return {
            error: error?.message
        }
    }

});