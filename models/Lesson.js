import { Schema, model } from "mongoose";

const LessonSchema = new Schema({
    lessonTitle: { type: String, required: true },
    lessonDescription: { type: String, required: true },
    lessonDetails: { type: String, required: true },

})

const Lesson = model("Lesson", LessonSchema)
export default Lesson