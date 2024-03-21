import { and, eq } from "drizzle-orm";
import db from "@/db/drizzle";
import { challengeProgress, challenges, userProgress } from "@/db/schema";

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

        if (!currentUserProgress) {
            throw new Error("User progress not found");
        }

        const challenge = await db.query.challenges.findFirst({
            where: eq(challenges.id, challengeId)
        });

        if (!challenge) {
            throw new Error("Challenge not found");
        }

        const lessonId = challenge.lessonId;

        const existingChallengeProgress = await db.query.challengeProgress.findFirst({
            where: and(
                eq(challengeProgress.userId, userId),
                eq(challengeProgress.challengeId, challengeId),
            ),
        });

        const isPractice = !!existingChallengeProgress;

        if (
            currentUserProgress.hearts === 0 &&
            !isPractice &&
            !userSubscription?.isActive
        ) {
            return { error: "hearts" };
        }

        if (isPractice) {
            await db.update(challengeProgress).set({
                completed: true,
            })
                .where(
                    eq(challengeProgress.id, existingChallengeProgress.id)
                );

            await db.update(userProgress).set({
                hearts: Math.min(currentUserProgress.hearts + 1, 5),
                points: currentUserProgress.points + 10,
            }).where(eq(userProgress.userId, userId));


            return {
                success: true
            };
        }

        await db.insert(challengeProgress).values({
            challengeId,
            userId,
            completed: true,
        });

        await db.update(userProgress).set({
            points: currentUserProgress.points + 10,
        }).where(eq(userProgress.userId, userId));

        return {
            success: true
        };

    } catch (error) {
        return {
            error: error?.message
        }
    }
});