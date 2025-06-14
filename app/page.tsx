"use client";

import { getPrompt } from "@/lib/utils";
import { Accordion, AccordionItem } from "@heroui/accordion";
import { Button } from "@heroui/button";
import { Form } from "@heroui/form";
import { Textarea } from "@heroui/input";
import { Slider } from "@heroui/slider";
import { Spinner } from "@heroui/spinner";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function Home() {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [test, setTest] = useState(null);

  const [options, setOptions] = useState<number>(3);
  const [questions, setQuestions] = useState<number>(5);

  const [prompt, setPrompt] = useState<string>("");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    // Prevent default browser page refresh.
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    console.log(data); // Now you can see all the named form inputs
    console.log("sumbited");

    setIsLoading(true);
    const res = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt: getPrompt(options, questions, prompt) }),
    });
    setIsLoading(false);

    const res_data = await res.json();
    const test_data = res_data.response.output[0].content[0].text;
    if (res.ok) {
      const id = uuidv4();
      localStorage.setItem(id, JSON.stringify(test_data));
      setTest(test_data);
    } else {
      console.error(data.error);
    }
  };

  return (
    <section className="flex flex-col items-center gap-6 px-4">
      <h1 className="text-2xl mt-10">Create new test</h1>
      <div className="w-full max-w-2xl flex flex-col gap-3">
        <Form onSubmit={onSubmit}>
          <Textarea
            isRequired
            errorMessage="Test cannot be created without the initial data."
            label="Data"
            labelPlacement="outside"
            name="Data"
            placeholder="Enter your data to create the test."
            maxRows={24}
            onChange={(e) => {
              setPrompt(e.target.value);
            }}
            value={prompt}
          />
          <div
            className={`transition-all duration-200 ease-in-out ${isExpanded ? "w-full" : "w-1/2"}`}
          >
            <Accordion
              onSelectionChange={() => setIsExpanded((prev) => !prev)}
              className="border border-default-200 rounded-medium"
              variant="shadow"
              isCompact
              itemClasses={{
                title: "text-xs",
                content: "text-sm",
              }}
            >
              <AccordionItem key="1" aria-label="Settings" title="Settings">
                <div className="py-3 flex flex-col gap-7">
                  <Slider
                    className="max-w-[200px]"
                    color="foreground"
                    defaultValue={3}
                    label={<p className="text-sm">Number of options</p>}
                    maxValue={5}
                    minValue={3}
                    size="sm"
                    step={1}
                    aria-label="Number of options"
                    onChangeEnd={(value) => setOptions(value as number)}
                  />

                  <Slider
                    className="max-w-sm"
                    color="foreground"
                    defaultValue={5}
                    label={<p className="text-sm">Number of questions</p>}
                    maxValue={25}
                    minValue={5}
                    size="sm"
                    step={1}
                    aria-label="Number of options"
                    onChangeEnd={(value) => setQuestions(value as number)}
                  />
                </div>
              </AccordionItem>
            </Accordion>
          </div>

          <Button
            type="submit"
            variant="solid"
            className="bg-pink-500 mt-6 w-full disabled:bg-pink-900 disabled:text-gray-400"
            disabled={isLoading || !!test}
          >
            Generate the test
          </Button>

          {isLoading && (
            <div className="w-full flex justify-center mt-6">
              <Spinner color="danger" />
            </div>
          )}

          {test && (
            <Button
              variant="solid"
              className="bg-pink-500 mt-6 w-full disabled:bg-pink-900 disabled:text-gray-400"
              disabled={isLoading}
            >
              Take the test
            </Button>
          )}
        </Form>
      </div>
    </section>
  );
}
