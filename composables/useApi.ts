import type {
    UserProgress,
    Subscription,
    UnitWithLessons,
    courseProgress,
    LessonWithExtras,
    User
} from "@/db/queries";

export const useApi = () => {

    const getUserProgress = () => {
        return $fetch<UserProgress | null>(`/api/progress`)
    }

    const getUnits = () => {
        return $fetch<UnitWithLessons[] | null>(`/api/units`)
    }

    const getUserSubscriptions = () => {
        return $fetch<Subscription | null>(`/api/subscription`)
    }

    const getLessonPercentage = () => {
        return $fetch<number>(`/api/lesson-percentage`)
    }

    const getCoursProgress = () => {
        return $fetch<courseProgress>(`/api/course/progress`)
    }

    const getLesson = (lessonId?: number) => {
        return lessonId ? $fetch<LessonWithExtras[] | null>(`/api/lesson?lessonId=${lessonId}`) : $fetch<LessonWithExtras[] | null>(`/api/lesson`)
    }

    const getTopUsers = () => {
        return $fetch<User[]>(`/api/top-users`)
    }

    const refillHearts = () => {
        return $fetch<User[]>(`/api/refill-hearts`)
    }

    const getCourses = () => {
        return $fetch<User[]>(`/api/courses`)
    }

    return {
        getUserProgress,
        getUnits,
        getUserSubscriptions,
        getLessonPercentage,
        getCoursProgress,
        getLesson,
        getTopUsers,
        refillHearts,
        getCourses
    }
}