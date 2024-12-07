import { NextResponse } from "next/server";
import { connectToDB } from "@/app/lib/db";
import { Habit } from "@/app/lib/habitSchema";

export async function POST(req: Request) {
    try {
        const data = await req.json();

        const { name, icon, frequency, notification, isNotification, area, completedDays } = data;
        const newHabit = new Habit({
            name,
            icon,
            frequency,
            notification,
            isNotification,
            area,
            completedDays,
        });
        await newHabit.save();

        return NextResponse.json({ message: 'Habit saved successfully', habit: newHabit }, { status: 201 });
    } catch (error) {
        console.error('Error saving habit:', error);
        return NextResponse.json({ error: 'Failed to save habit' }, { status: 500 });
    }
}
