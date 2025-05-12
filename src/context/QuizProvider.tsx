import {
  PropsWithChildren,
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { Question } from "../types/types";
import questions from "../data/questions";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface QuizContextType {
  currentQuestion?: Question | null;
  questionCount: number;
  totalQuestions: number;
  selectRandomQuestion?: () => void;
  selectedOption?: string | null;
  setSelectedOption?: (newOption: string) => void;
  onNext: () => void;
  score: number;
  restartQuiz?: () => void;
  isFinished: boolean;
  setIsFinished: (value: boolean) => void;
  bestScore: number;
}

const QuizContext = createContext<QuizContextType | null>(null);

// * custom hook to use the QuizContext
export function useQuiz() {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error("useQuiz must be used within a QuizProvider");
  } else {
    return context;
  }
}

export default function QuizProvider({ children }: PropsWithChildren) {
  const [availableQuestions, setAvailableQuestions] = useState([...questions]);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [questionCount, setQuestionCount] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | undefined>();
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [bestScore, setBestScore] = useState(0);

  // * load the best score from AsyncStorage
  useEffect(() => {
    getBestScore();
  }, []);

  // * check the best score
  useEffect(() => {
    if (isFinished === true && score > bestScore) {
      setBestScore(score);
      saveBestScore();
    }
    //console.warn(bestScore);
  }, [isFinished]);

  // * Initialize the quiz with a random question
  useEffect(() => {
    selectRandomQuestion();
  }, []);

  // * Select a random question from available questions
  const selectRandomQuestion = () => {
    if (availableQuestions.length === 0) {
      setCurrentQuestion(null);
      setIsFinished(true);
      return;
    }

    const randomIndex = Math.floor(Math.random() * availableQuestions.length);
    const selectedQuestion = availableQuestions[randomIndex];

    // Remove the selected question from available questions
    setAvailableQuestions((prev) =>
      prev.filter((_, index) => index !== randomIndex)
    );
    setCurrentQuestion(selectedQuestion);
    setQuestionCount((curQuestion) => curQuestion + 1);
  };

  // * On press of the answer option, check if the answer is correct
  const onNext = () => {
    // Check if the selected option is correct
    if (currentQuestion) {
      if (selectedOption === currentQuestion.correctAnswer) {
        setScore((curScore) => curScore + 1);
      }
    }
    setSelectedOption(undefined);
    selectRandomQuestion();
  };

  // * restart the quiz
  const restartQuiz = useCallback(() => {
    // Reset game state first
    setAvailableQuestions([...questions]);
    setScore(0);
    setQuestionCount(0);
    setSelectedOption(undefined);

    // Use setTimeout to ensure state updates are processed
    setTimeout(() => {
      setIsFinished(false);
      selectRandomQuestion();
    }, 0);
  }, []);

  // * Save the bestt score to AsyncStorage
  const saveBestScore = async () => {
    try {
      await AsyncStorage.setItem("bestScore", bestScore.toString());
    } catch (error) {
      console.error("Error saving best score:", error);
    }
  };

  // * load the best score from AsyncStorage
  const getBestScore = async () => {
    try {
      const value = await AsyncStorage.getItem("bestScore");
      if (value !== null) {
        setBestScore(parseInt(value));
      }
    } catch (error) {
      console.error("Error loading best score:", error);
    }
  };

  return (
    <QuizContext.Provider
      value={{
        currentQuestion,
        questionCount,
        totalQuestions: questions.length,
        onNext,
        selectedOption,
        setSelectedOption,
        score,
        restartQuiz,
        isFinished,
        setIsFinished,
        bestScore,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}
