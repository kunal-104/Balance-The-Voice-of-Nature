"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
// import { Card } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Progress } from "@/components/ui/progress"
import { ArrowLeft, CheckCircle2, XCircle } from "lucide-react"
import Link from "next/link"
import {Button, Card, Progress} from "@heroui/react";
const quizQuestions = [
  {
    question: "Which of the following is NOT a renewable energy source?",
    options: ["Solar", "Wind", "Natural Gas", "Hydroelectric"],
    correctAnswer: "Natural Gas",
    explanation:
      "Natural gas is a fossil fuel and is not renewable. Solar, wind, and hydroelectric are all renewable energy sources.",
  },
  {
    question: "What percentage of the Earth's surface is covered by water?",
    options: ["50%", "60%", "70%", "80%"],
    correctAnswer: "70%",
    explanation:
      "Approximately 70% of the Earth's surface is covered by water, with oceans making up about 96.5% of all Earth's water.",
  },
  {
    question: "Which of the following is the largest contributor to greenhouse gas emissions globally?",
    options: ["Transportation", "Electricity production", "Agriculture", "Industry"],
    correctAnswer: "Electricity production",
    explanation:
      "Electricity production generates the largest share of greenhouse gas emissions globally, primarily from burning fossil fuels like coal and natural gas.",
  },
  {
    question: "What is the primary cause of ocean acidification?",
    options: ["Plastic pollution", "Oil spills", "Carbon dioxide absorption", "Chemical runoff"],
    correctAnswer: "Carbon dioxide absorption",
    explanation:
      "Ocean acidification occurs when the ocean absorbs carbon dioxide from the atmosphere, changing the water's chemistry and making it more acidic.",
  },
  {
    question: "Which ecosystem is known as the 'lungs of the Earth'?",
    options: ["Coral reefs", "Rainforests", "Grasslands", "Tundra"],
    correctAnswer: "Rainforests",
    explanation:
      "Rainforests, particularly the Amazon, are often called the 'lungs of the Earth' because they produce large amounts of oxygen through photosynthesis and store vast amounts of carbon.",
  },
  {
    question: "What is the main cause of deforestation worldwide?",
    options: ["Urban development", "Agriculture", "Logging", "Mining"],
    correctAnswer: "Agriculture",
    explanation:
      "Agriculture (including livestock ranching and crops) is the primary driver of deforestation globally, as forests are cleared to make way for farmland.",
  },
  {
    question: "Which of the following is NOT a benefit of biodiversity?",
    options: ["Ecosystem stability", "Economic uniformity", "Medical discoveries", "Food security"],
    correctAnswer: "Economic uniformity",
    explanation:
      "Economic uniformity is not a benefit of biodiversity. In fact, biodiversity often leads to economic diversity through various ecosystem services and resources.",
  },
  {
    question: "What is the primary goal of the Paris Climate Agreement?",
    options: [
      "Eliminate fossil fuels by 2050",
      "Limit global warming to below 2°C",
      "Ban single-use plastics",
      "Protect endangered species",
    ],
    correctAnswer: "Limit global warming to below 2°C",
    explanation:
      "The Paris Agreement aims to limit global temperature rise to well below 2°C above pre-industrial levels, with efforts to limit it to 1.5°C.",
  },
  {
    question: "Which of these actions has the highest impact on reducing an individual's carbon footprint?",
    options: ["Using reusable bags", "Having one fewer child", "Recycling regularly", "Taking shorter showers"],
    correctAnswer: "Having one fewer child",
    explanation:
      "Studies show that having one fewer child has the highest potential impact on reducing an individual's carbon footprint, as it affects emissions across generations.",
  },
]

export default function QuizPage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [score, setScore] = useState(0)
  const [showExplanation, setShowExplanation] = useState(false)
  const [quizCompleted, setQuizCompleted] = useState(false)

  const currentQuestion = quizQuestions[currentQuestionIndex]
  const progress = ((currentQuestionIndex + 1) / quizQuestions.length) * 100

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer)
    setShowExplanation(true)

    if (answer === currentQuestion.correctAnswer) {
      setScore(score + 1)
    }
  }

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
      setSelectedAnswer(null)
      setShowExplanation(false)
    } else {
      setQuizCompleted(true)
    }
  }

  const resetQuiz = () => {
    setCurrentQuestionIndex(0)
    setSelectedAnswer(null)
    setShowExplanation(false)
    setScore(0)
    setQuizCompleted(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-blue-50 dark:from-green-950 dark:to-blue-950 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-6 flex items-center">
          <Link href="/" className="mr-4">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">Eco Quiz Challenge</h1>
        </div>

        <AnimatePresence mode="wait">
          {!quizCompleted ? (
            <motion.div
              key="quiz"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="p-6 mb-4">
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span>
                      Question {currentQuestionIndex + 1} of {quizQuestions.length}
                    </span>
                    <span>Score: {score}</span>
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>

                <h2 className="text-xl font-semibold mb-6">{currentQuestion.question}</h2>

                <div className="space-y-3">
                  {currentQuestion.options.map((option, index) => {
                    const isCorrect = option === currentQuestion.correctAnswer
                    const isSelected = option === selectedAnswer

                    let optionClass =
                      "border border-input p-4 rounded-md transition-all cursor-pointer hover:border-primary"

                    if (showExplanation) {
                      if (isCorrect) {
                        optionClass = "border border-green-500 bg-green-50 dark:bg-green-900/20 p-4 rounded-md"
                      } else if (isSelected) {
                        optionClass = "border border-red-500 bg-red-50 dark:bg-red-900/20 p-4 rounded-md"
                      } else {
                        optionClass = "border border-input p-4 rounded-md opacity-70"
                      }
                    }

                    return (
                      <div
                        key={index}
                        className={optionClass}
                        onClick={() => !showExplanation && handleAnswerSelect(option)}
                      >
                        <div className="flex items-center justify-between">
                          <span>{option}</span>
                          {showExplanation && isCorrect && <CheckCircle2 className="h-5 w-5 text-green-500" />}
                          {showExplanation && isSelected && !isCorrect && <XCircle className="h-5 w-5 text-red-500" />}
                        </div>
                      </div>
                    )
                  })}
                </div>

                <AnimatePresence>
                  {showExplanation && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-6 p-4 bg-muted rounded-md"
                    >
                      <h3 className="font-medium mb-2">Explanation:</h3>
                      <p>{currentQuestion.explanation}</p>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="mt-6 flex justify-end">
                  {showExplanation && (
                    <Button onClick={handleNextQuestion}>
                      {currentQuestionIndex < quizQuestions.length - 1 ? "Next Question" : "See Results"}
                    </Button>
                  )}
                </div>
              </Card>
            </motion.div>
          ) : (
            <motion.div key="results" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
              <Card className="p-6 text-center">
                <h2 className="text-2xl font-bold mb-4">Quiz Completed!</h2>

                <div className="mb-6">
                  <div className="text-5xl font-bold mb-2">
                    {score} / {quizQuestions.length}
                  </div>
                  <p className="text-muted-foreground">
                    {score === quizQuestions.length
                      ? "Perfect score! You're an eco-warrior!"
                      : score >= quizQuestions.length * 0.7
                        ? "Great job! You know your environmental facts."
                        : "Good effort! Keep learning about our environment."}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button onClick={resetQuiz}>Try Again</Button>
                  <Link href="/">
                    <Button variant="outline">Back to Home</Button>
                  </Link>
                </div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

