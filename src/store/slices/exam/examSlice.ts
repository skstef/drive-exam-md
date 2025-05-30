import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { setCategory } from "./middleware/setCategory";
import { Code } from "./types/Code";
import { ITicket } from "./types/ITicket";

interface ExamState {
  currentQuestion: number | null;
  totalQuestions: number | null;
  category: Code | null;
  questions:
    | (ITicket & {
        answer?: number;
        isAnswerCorrect?: boolean;
        isAnswered?: boolean;
      })[]
    | null;
  totalTime: number | null;
  allowedErrors: number | null;
  language: string | null;
  isExamFailed: boolean;
  wrongResponsesCount: number | null;
  failedCause: "answers" | "time" | null;
}

const initialState: ExamState = {
  currentQuestion: null,
  totalQuestions: null,
  category: null,
  questions: null,
  totalTime: null,
  allowedErrors: null,
  language: null,
  isExamFailed: false,
  failedCause: null,
  wrongResponsesCount: null,
};

const examSlice = createSlice({
  name: "exam",
  initialState,
  reducers: {
    setLanguage(state, action: PayloadAction<string>) {
      state.language = action.payload;
    },
    setAnswer(state, action: PayloadAction<{ answer: number }>) {
      const { answer } = action.payload;

      if (state.questions && state.currentQuestion !== null) {
        const currentQuestion = state.questions[state.currentQuestion];

        currentQuestion.answer = answer;
        currentQuestion.isAnswered = true;
        currentQuestion.isAnswerCorrect =
          answer + 1 === currentQuestion.question_answer;

        if (!currentQuestion.isAnswerCorrect) {
          state.wrongResponsesCount! += 1;
        }

        if (state.wrongResponsesCount! > state.allowedErrors!) {
          state.isExamFailed = true;
          state.failedCause = "answers";
        }
      }
    },
    nextQuestion(state) {
      if (
        state.totalQuestions !== null &&
        state.questions &&
        state.currentQuestion !== null &&
        state.currentQuestion < state.totalQuestions
      ) {
        const currentQuestion = state.questions[state.currentQuestion];

        if (currentQuestion.isAnswered) {
          state.currentQuestion += 1;
        }
      }
    },
    setExamFailed(state) {
      state.isExamFailed = true;
      state.failedCause = "time";
    },
    resetExam(state) {
      state.category = null;
      state.totalQuestions = null;
      state.currentQuestion = null;
      state.questions = null;
      state.totalTime = null;
      state.allowedErrors = null;
      state.isExamFailed = false;
      state.failedCause = null;
      state.wrongResponsesCount = null;
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
      state.wrongResponsesCount = 0;
      state.isExamFailed = false;
      state.failedCause = null;
    });
  },
});

export const {
  setLanguage,
  setAnswer,
  nextQuestion,
  setExamFailed,
  resetExam,
} = examSlice.actions;
export default examSlice.reducer;
