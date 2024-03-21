
import { eq } from "drizzle-orm";

import db from "@/db/drizzle";
import {
    challengeProgress,
    courses,
    lessons,
    units,
    userProgress,
    userSubscription
} from "@/db/schema";

export const getUnits = async () => {
    return await db.query.units.findMany();
};

export const getCourses = async () => {
    return await db.query.courses.findMany();
};

export const getChallenges = async () => {
    return await db.query.challenges.findMany();
};

export const getLessons = async () => {
    return await db.query.lessons.findMany();
};

export const getChallengeOptions = async () => {
    return await db.query.challengeOptions.findMany();
};