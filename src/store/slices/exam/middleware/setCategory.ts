import { createAsyncThunk } from "@reduxjs/toolkit";
import { Code } from "../types/Code";
import { ITicket } from "../types/ITicket";
import { RootState } from "@/store";
import tickets from "@/questions/ticket.json";
import { proportionallyRandomSelect } from "@/store/utils/proportionallyRandomSelect";
import { CATEGORIES } from "@/config/categories";

export const setCategory = createAsyncThunk(
  "exam/setCategory",
  async (arg: { code: Code }, thunkAPI) => {
    const store = thunkAPI.getState() as RootState;
    const selectedLanguage = store.exam.language;

    const examData = CATEGORIES.find((el) => el.categoryCode === arg.code)!;

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
