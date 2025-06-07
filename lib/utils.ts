import axios from 'axios';

const axiosClient = axios.create({
    baseURL: 'https://some-domain.com/api/',
    timeout: 1000,
    headers: { 'X-Custom-Header': 'foobar' },
});

export function getPrompt(options: number, questions: number, content: string) {
    const optionPlaceholders = Array.from({ length: options }, (_, i) => `"<${String.fromCharCode(65 + i)}>"`).join(
        ', '
    );
    const optionCountValidation = `Each "options" array length == ${options} and answer_index in [0,${options - 1}]`;

    return `# SYSTEM
You are an expert assessment designer.  
Your task is to read the user’s SOURCE TEXT and return a JSON array of multiple-choice questions that assess comprehension at several cognitive levels based on SOURCE TEXT only..  
Follow the exact JSON schema, validation rules, and content guidelines below.  
Do not output anything except the final JSON array.  
If you cannot comply, output the single string "ERROR".

# SCHEMA  (all keys required and order preserved)
[
  {
    "id": "<string, unique short id like Q01, Q02…>",
    "question": "<string, clear stem without the answer>",
    "options": [${optionPlaceholders}],  // exactly ${options} options
    "answer_index": <int 0-${options - 1}>,  // index of correct option
    "explanation": "<string, ≤150 chars why answer is correct>",
    "difficulty": "<easy | medium | hard>",
    "cognitive_level": "<remember | understand | apply | analyze | evaluate>"
  },
  … (repeat for each question)
]

# GLOBAL PARAMETERS
TOTAL_QUESTIONS            = ${questions}
MAX_STEM_CHARS             = 160
MAX_OPTION_CHARS           = 80
LANGUAGE                   = "English"
RANDOMIZE_CORRECT_POSITION = true
UNIQUE_OPTION_PER_QUESTION = true
NO “All of the above” OR “None of the above”.

# CONTENT RULES
1. Base every question strictly on the SOURCE TEXT, do not use general knowldege!, if source text is not enough to form a sufficient test, return output the single string "ERROR".
2. Distribute difficulties roughly 20 % easy, 40 % medium, 40 % hard.  
3. Cover the breadth of the chapter (different sub-topics).  
4. At least 30 % of questions must target ≥ “apply” cognitive level.  
5. No trivia: each item must test a meaningful concept or skill.  
6. Use inclusive, bias-free, gender-neutral language.  
7. Check that every distractor is plausible but clearly incorrect. Make sure that distractors are believable.
8. Explanation must cite the specific idea/concept (1 – 2 sentences max).

# OUTPUT VALIDATION BEFORE SENDING
• Must be valid JSON5 / JSON (no trailing commas, no comments).  
• The array length must equal TOTAL_QUESTIONS.  
• Each "id" must be unique.  
• ${optionCountValidation}.
If any check fails, regenerate internally until it passes.

# SOURCE
 ${content}
# SOURCE END`;
}

export function getUnansweredQuesiton(test, answers : {[questionId: string]: string }): string[] {
  const testKeys = Object.keys(test);
  const answersKeys = Object.keys(answers);

  const difference = testKeys.filter((key) => !answersKeys.includes(key));

  console.log(difference)
  return difference
}