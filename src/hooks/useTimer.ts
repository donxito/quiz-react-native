import { useState, useEffect, useRef } from "react";
import { useQuiz } from "../context/QuizProvider";

export function useTimer(maxTime: number) {
  const { onNext, currentQuestion, isFinished } = useQuiz();

  const [timer, setTimer] = useState(maxTime);

  const interval = useRef<NodeJS.Timeout>(null); // to not update the timer when the component is unmounted

  // * when the time is over, move to the next question
  useEffect(() => {
    if (timer <= 0 && !isFinished) {
      onNext();
    }
  }, [timer, onNext, isFinished]);

  // * start timer when a new question is selected
  useEffect(() => {
    if (isFinished) {
      return;
    }

    // start count down
    setTimer(maxTime);
    interval.current = setInterval(() => {
      setTimer((t) => {
        if (interval.current && t <= 1) {
          clearInterval(interval.current);

          return 0;
        }
        return t - 1;
      });
    }, 1000);
    // clear interval when timer reaches 0
    return () => {
      if (interval.current) {
        clearInterval(interval.current);
      }
    };
  }, [currentQuestion, isFinished]);

  return timer;
}
