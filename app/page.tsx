  "use client";

  import { Accordion, AccordionItem } from "@heroui/accordion";
  import { Button } from "@heroui/button";
  import { Form } from "@heroui/form";
  import { Textarea } from "@heroui/input";
  import { Slider } from "@heroui/slider";
  import { useState } from "react";

  export default function Home() {
    const [isExpanded, setIsExpanded] = useState(false);

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      // Prevent default browser page refresh.
      e.preventDefault();
      console.log('sumbited')

      const res = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: 'generate 1 sentence about sky' }),
      });

      const data = await res.json();
      if (res.ok) {
        console.log(data)
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
                    />

                    <div>
                      <h3 className="text-sm">Custom prompt</h3>
                      <Textarea
                        className=""
                        placeholder="Enter custom promt to create the test with. (optional)"
                        minRows={1}
                        maxRows={4}
                        variant={"underlined"}
                      />
                    </div>
                  </div>
                </AccordionItem>
              </Accordion>
            </div>

            <Button type="submit" variant="solid" className="bg-pink-500 mt-6 w-full">
              Create test
            </Button>
          </Form>
        </div>

      </section>
    );
  }
