import db from "@/db/drizzle";
import { eq, and } from "drizzle-orm";
import { userProgress, challengeProgress, challenges } from "@/db/schema";
import { getUserProgress, getUserSubscription } from "@/db/queries";

export default defineEventHandler(async (event) => {
    const { challengeId } = await getQuery(event);

    const { auth } = await event.context;

    const userId = auth?.userId;

    if (!(userId)) {
        throw createError({
            statusMessage: 'Unauthorized'
        });
    };

    try {

        const currentUserProgress = await getUserProgress(userId);
        const userSubscription = await getUserSubscription(userId);

        const challenge = await db.query.challenges.findFirst({
            where: eq(challenges.id, challengeId),
        });

        if (!challenge) {
            throw new Error("Challenge not found");
        }

        const existingChallengeProgress = await db.query.challengeProgress.findFirst({
            where: and(
                eq(challengeProgress.userId, userId),
                eq(challengeProgress.challengeId, challengeId),
            ),
        });

        const isPractice = !!existingChallengeProgress;

        if (isPractice) {
            return { error: "practice" };
        }

        if (!currentUserProgress) {
            throw new Error("User progress not found");
        }

        if (userSubscription?.isActive) {
            return { error: "subscription" };
        }

        if (currentUserProgress.hearts === 0) {
            return { error: "hearts" };
        }

        await db.update(userProgress).set({
            hearts: Math.max(currentUserProgress.hearts - 1, 0),
        }).where(eq(userProgress.userId, userId));

        return {
            success: true
        }

    } catch (error) {
        return {
            error: error?.message
        }
    }
});