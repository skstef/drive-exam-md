import { Code } from "@/store/slices/exam/types/Code";

export const CATEGORIES: {
  title: string;
  image: string;
  categoryCode: Code;
  count: number;
  totalTime: number;
  allowedErrors: number;
  additionalImage: string;
}[] = [
  {
    title: "AM, A1, A2, A, B1, B",
    image: "/images/category_a_b.png",
    additionalImage: "/images/auto_a1_a2_a_b1_b.png",
    categoryCode: "EXAM_A1_A2_A_B1_B",
    count: 24,
    totalTime: 30,
    allowedErrors: 2,
  },
  {
    title: "C1, C",
    image: "/images/category_c_d_e.png",
    additionalImage: "/images/auto_c1_c.png",
    categoryCode: "EXAM_C1_C",
    count: 30,
    totalTime: 38,
    allowedErrors: 3,
  },
  {
    title: "BE",
    image: "/images/exam_b_e.png",
    additionalImage: "/images/auto_b_e.png",
    categoryCode: "EXAM_B_E",
    count: 30,
    totalTime: 38,
    allowedErrors: 3,
  },
  {
    title: "C1E, CE",
    image: "/images/exam_c1_e_c_e.png",
    additionalImage: "/images/auto_c1_e_c_e.png",
    categoryCode: "EXAM_C1_E_C_E",
    count: 36,
    totalTime: 45,
    allowedErrors: 2,
  },
  {
    title: "D1E, DE",
    image: "/images/exam_d1_e_d_e.png",
    additionalImage: "/images/auto_d1_e_d_e.png",
    categoryCode: "EXAM_D1_E_D_E",
    count: 36,
    totalTime: 45,
    allowedErrors: 2,
  },
  {
    title: "D1, D",
    image: "/images/exam_d1_d.png",
    additionalImage: "/images/auto_d1_d.png",
    categoryCode: "EXAM_D1_D",
    count: 30,
    totalTime: 38,
    allowedErrors: 2,
  },
  {
    title: "F",
    image: "/images/exam_f.png",
    additionalImage: "/images/auto_f.png",
    categoryCode: "EXAM_F",
    count: 30,
    totalTime: 38,
    allowedErrors: 2,
  },
];
