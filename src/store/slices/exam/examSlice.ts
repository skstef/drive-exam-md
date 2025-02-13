import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { setCategory } from "./middleware/setCategory";
import { Code } from "./types/Code";
import { ITicket } from "./types/ITicket";

interface ExamState {
  currentQuestion: number | null;
  totalQuestions: number | null;
  category: Code | null;
  questions:
    | (ITicket & { answer?: number; isAnswerCorrect?: boolean })[]
    | null;
  totalTime: number | null;
  allowedErrors: number | null;
  language: string | null;
  errors: number;
}

const initialState: ExamState = {
  currentQuestion: null,
  totalQuestions: null,
  category: null,
  questions: null,
  totalTime: null,
  allowedErrors: null,
  language: null,
  errors: 0,
};

const examSlice = createSlice({
  name: "exam",
  initialState,
  reducers: {
    setLanguage(state, action: PayloadAction<string>) {
      state.language = action.payload;
    },
    setAnswer(state, action: PayloadAction<{ index: number; answer: number }>) {
      const { index, answer } = action.payload;

      if (state.questions) {
        state.questions[index].answer = answer;
        state.questions[index].isAnswerCorrect =
          answer === state.questions[index].question_answer;
      }
    },
    nextQuestion(state) {
      if (
        state.currentQuestion !== null &&
        state.totalQuestions !== null &&
        state.currentQuestion < state.totalQuestions
      ) {
        state.currentQuestion += 1;
      }
    },
    setErrors(state, action: PayloadAction<number>) {
      state.errors = action.payload;
    },
    resetExam(state) {
      state.category = null;
      state.totalQuestions = null;
      state.currentQuestion = null;
      state.questions = null;
      state.totalTime = null;
      state.allowedErrors = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(setCategory.fulfilled, (state, action) => {
      state.category = action.meta.arg.code;
      state.totalQuestions = action.payload.questions.length;
      state.currentQuestion = 0;
      state.questions = action.payload.questions;
      state.totalTime = action.payload.totalTime;
      state.allowedErrors = action.payload.allowedErrors;
    });
  },
});

export const { setLanguage, setAnswer, nextQuestion, setErrors, resetExam } =
  examSlice.actions;
export default examSlice.reducer;
