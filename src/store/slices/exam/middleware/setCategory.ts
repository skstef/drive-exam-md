import { createAsyncThunk } from "@reduxjs/toolkit";
import { Code } from "../types/Code";
import { ITicket } from "../types/ITicket";
import { RootState } from "@/store";
import tickets from "@/questions/ticket.json";
import { proportionallyRandomSelect } from "@/store/utils/proportionallyRandomSelect";

const CATEGORIES_QUESTION_COUNT_TIME = {
  EXAM_A1_A2_A_B1_B: {
    count: 24,
    totalTime: 30,
    allowedErrors: 2,
  },
  EXAM_C1_C: { count: 30, totalTime: 38, allowedErrors: 3 },
  EXAM_B_E: {
    count: 30,
    totalTime: 38,
    allowedErrors: 3,
  },
  EXAM_C1_E_C_E: { count: 36, totalTime: 45, allowedErrors: 2 },
  EXAM_D1_E_D_E: { count: 36, totalTime: 45, allowedErrors: 2 },
  EXAM_D1_D: { count: 30, totalTime: 38, allowedErrors: 2 },
  EXAM_F: { count: 30, totalTime: 38, allowedErrors: 2 },
};

export const setCategory = createAsyncThunk(
  "exam/setCategory",
  async (arg: { code: Code }, thunkAPI) => {
    const store = thunkAPI.getState() as RootState;
    const selectedLanguage = store.exam.language;

    const examData = CATEGORIES_QUESTION_COUNT_TIME[arg.code];

    const questions = (tickets as ITicket[]).filter(
      (ticket) =>
        ticket.code_content.includes(arg.code) &&
        ticket.language === selectedLanguage
    );

    const selectedQuestions = proportionallyRandomSelect(
      questions,
      examData.count
    );

    return {
      questions: selectedQuestions,
      totalTime: examData.totalTime,
      allowedErrors: examData.allowedErrors,
    };
  }
);
