"use client";

import { useState } from "react";
import { Button } from "@heroui/button";
import { Card, CardBody, CardFooter, CardHeader } from "@heroui/card";
import { Divider } from "@heroui/divider";
import { Pagination } from "@heroui/pagination";
import TestCard from "@/components/test/test_card";

const test = {
  Q01: {
    id: "Q01",
    question:
      "What is the primary purpose of the TEST source according to the provided text?",
    options: [
      "To evaluate knowledge through questions",
      "To teach new concepts",
      "To summarize information",
    ],
    answer_index: 0,
    explanation:
      "The text indicates the test's main goal is to assess understanding via questions.",
    difficulty: "easy",
    cognitive_level: "remember",
  },
  Q02: {
    id: "Q02",
    question:
      "Which cognitive level is primarily targeted by questions that ask for explanation of concepts in the text?",
    options: ["apply", "remember", "understand"],
    answer_index: 2,
    explanation:
      "Explaining concepts involves comprehension, thus targeting 'understand' level.",
    difficulty: "medium",
    cognitive_level: "understand",
  },
  Q03: {
    id: "Q03",
    question:
      "If a question asks how to implement a certain method described in the text, what cognitive skill does it assess?",
    options: ["evaluate", "apply", "analyze"],
    answer_index: 1,
    explanation:
      "Implementing a method tests ability to apply knowledge practically.",
    difficulty: "medium",
    cognitive_level: "apply",
  },
  Q04: {
    id: "Q04",
    question:
      "What should be ensured about distractors in the questions based on the content rules?",
    options: [
      "Distractors should be obviously wrong",
      "Distractors should be plausible but incorrect",
      "Distractors can be unrelated",
    ],
    answer_index: 1,
    explanation:
      "Distractors must be believable yet incorrect to properly assess understanding.",
    difficulty: "hard",
    cognitive_level: "analyze",
  },
  Q05: {
    id: "Q05",
    question:
      "Why is it important to cover different sub-topics in the questions derived from the source?",
    options: [
      "To make the test longer",
      "To ensure a comprehensive assessment",
      "To focus only on the easiest parts",
    ],
    answer_index: 1,
    explanation:
      "Covering sub-topics ensures a thorough evaluation of knowledge across the material.",
    difficulty: "hard",
    cognitive_level: "evaluate",
  },
};

export default function TestPage() {
  const [currentPage, setCurrentPage] = useState(1);

  const key = `Q0${currentPage}` as keyof typeof test;
  const question = test[key];

  const [answers, setAnswers] = useState<{ [questionId: string]: string }>({
    Q01: "Q01_option_2",
  });

  return (
    <section className="flex flex-col items-center gap-12 px-4">
      <div className="flex flex-col gap-5 ">
        <p className="text-small text-default-500">
          Selected Question: {currentPage}
        </p>
        <Pagination
          color="danger"
          page={currentPage}
          total={Object.keys(test).length}
          onChange={setCurrentPage}
          showControls
          siblings={3}
        />
      </div>

      <TestCard
        question={question}
        answers={answers}
        setAnswer={(optionId) => {
          setAnswers((prev) => ({
            ...prev,
            [question.id]: optionId, // where optionId = "Q01_option_2"
          }));
        }}
      />
    </section>
  );
}
