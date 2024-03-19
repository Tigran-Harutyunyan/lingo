import { clerkClient } from 'h3-clerk';
import { userProgress } from "@/db/schema";
import db from "@/db/drizzle";
import { getUserProgress, getCourseById } from "@/db/queries";

export default defineEventHandler(async (event) => {
    const { courseId } = await getQuery(event);

    const { auth } = await event.context;

    if (!(auth?.userId)) {
        throw createError({
            statusMessage: 'Unauthorized'
        });
    };

    if (courseId === undefined) {
        throw createError({
            statusMessage: 'Course id is not specified'
        });
    }

    try {
        const course = await getCourseById(Number(courseId));

        const user = await clerkClient.users.getUser(auth?.userId);

        if (!course) {
            throw new Error("Course not found");
        }

        //TODO: turn it back

        // if (!course.units.length || !course.units[0].lessons.length) {
        //     throw new Error("Course is empty");
        // }

        const existingUserProgress = await getUserProgress(auth.userId);

        if (existingUserProgress) {
            await db.update(userProgress).set({
                activeCourseId: Number(courseId),
                userName: user.firstName || "User",
                userImageSrc: user.imageUrl || "/mascot.svg",
            });

            return existingUserProgress;
        }

        await db.insert(userProgress).values({
            userId: auth.userId,
            activeCourseId: Number(courseId),
            userName: user?.firstName || "User",
            userImageSrc: user?.imageUrl || "/mascot.svg",
        });

        const updatedProgress = await getUserProgress(auth.userId);

        return updatedProgress;

    } catch (error) {
        return {
            error: error?.message
        }
    }
});