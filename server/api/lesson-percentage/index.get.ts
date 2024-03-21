import { getCourseProgress, getLesson } from "@/db/queries";

export default defineEventHandler(async (event) => {
    const { auth } = await event.context;

    if (!(auth.userId)) {
        throw createError({
            statusMessage: 'Unauthorized'
        });
    };

    try {
        const courseProgress = await getCourseProgress(auth.userId);

        if (!courseProgress?.activeLessonId) {
            return 0;
        }

        const lesson = await getLesson(auth.userId, courseProgress.activeLessonId);

        if (!lesson) {
            return 0;
        }

        const completedChallenges = lesson.challenges
            .filter((challenge) => challenge.completed);
        const percentage = Math.round(
            (completedChallenges.length / lesson.challenges.length) * 100,
        );

        return percentage;

    } catch (error) {
        return {
            error: error?.message
        }
    }

});