import { useDispatch } from "react-redux";
import { setCategory } from "@/store/slices/exam/examSlice";
import { useRouter } from "next/router";

const categories = [
  { label: "A1, A2, A, B1, B", value: "A1_A2_A_B1_B", questions: 24 },
  { label: "C1, C", value: "C1_C", questions: 30 },
  { label: "BE", value: "BE", questions: 30 },
  { label: "C1E, CE", value: "C1E_CE", questions: 36 },
  { label: "D1E, DE", value: "D1E_DE", questions: 36 },
  { label: "D1, D", value: "D1_D", questions: 30 },
  { label: "F", value: "F", questions: 30 },
];

export default function CategorySelector() {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleSelectCategory = (category: string) => {
    dispatch(setCategory(category));
    router.push("/exam");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-6">Select Exam Category</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-md">
        {categories.map(({ label, value, questions }) => (
          <button
            key={value}
            onClick={() => handleSelectCategory(value)}
            className="bg-blue-500 text-white p-4 rounded-lg shadow-md hover:bg-blue-600 transition w-full"
          >
            {label} ({questions} Questions)
          </button>
        ))}
      </div>
    </div>
  );
}
