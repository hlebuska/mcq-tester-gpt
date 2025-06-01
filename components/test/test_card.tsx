import { Card, CardBody, CardFooter, CardHeader } from "@heroui/card";
import { Divider } from "@heroui/divider";

interface IProps {
  question: {
    id: string;
    question: string;
    options: string[];
    answer_index: number;
    explanation: string;
    difficulty: string;
    cognitive_level: string;
  };
  answers: { [questionId: string]: string };
  setAnswer: (optionId: string) => void;
}

export default function TestCard({ question, answers, setAnswer }: IProps) {
  return (
    <Card className="w-[80%]">
      <CardHeader className="flex gap-3">
        <div className="flex flex-col">
          <p className="text-md font-semibold">Question:</p>
          <p className="text-small mt-2 text-default-800">
            {question.question}
          </p>
        </div>
      </CardHeader>

      <Divider />

      <CardBody className="flex flex-col p-0">
        {question.options.map((option, index) => {
          const optionId = `${question.id}_option_${index}`;
          const labelLetter = String.fromCharCode(65 + index); // A, B, C, etc.
          console.log(question.id);
          console.log(answers[question.id]);
          return (
            <div key={index} className="w-full">
              <input
                type="radio"
                id={optionId}
                className="hidden peer"
                checked={answers[question.id] == optionId}
                onChange={() => setAnswer(`${question.id}_option_${index}`)}
                name={`answer_${question.id}`}
              />
              <label
                htmlFor={optionId}
                className="block w-full p-3 cursor-pointer hover:bg-zinc-800 peer-checked:bg-zinc-950 peer-checked:text-danger-500 "
              >
                <p className="text-small">
                  {labelLetter}) {option}
                </p>
              </label>
              <Divider />
            </div>
          );
        })}
      </CardBody>

      <CardFooter>
        <div className="text-xs bg-green-800 text-white p-1 rounded-lg">
          {question.difficulty}
        </div>
      </CardFooter>
    </Card>
  );
}
