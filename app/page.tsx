"use client";

import { Button } from "@heroui/button";
import { useState } from "react";

import { Accordion, AccordionItem } from "@heroui/accordion";
import { Textarea } from "@heroui/input";
import { Slider } from "@heroui/slider";

export default function Home() {


  const [isExpanded, setIsExpanded] = useState(false);



  return (
    <section className="flex flex-col items-center gap-6 px-4">
      <h1 className="text-2xl mt-10">Create new test</h1>
      <div className="w-full max-w-2xl flex flex-col gap-3">
        <Textarea className="" label="Data" placeholder="Enter your data to create the test." maxRows={24} var />

        <div className={`transition-all duration-200 ease-in-out ${isExpanded ? 'w-full' : 'w-1/2'}`}>
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
                  aria-label='Number of options'
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
                  aria-label='Number of options'
                />

                <div>
                  <h3 className="text-sm">Custom prompt</h3>
                  <Textarea className="" placeholder="Enter custom promt to create test with. (optional)" minRows={1} maxRows={4} variant={'underlined'} />
                </div>

              </div>

            </AccordionItem>
          </Accordion>
        </div>

        <Button variant="solid" className="bg-pink-500 mt-6">Create test</Button>
      </div>

    </section>
  );
}
