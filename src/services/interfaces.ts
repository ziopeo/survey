export interface Question {
    surveyId: string;
    question: string;
    textCorrectAnswer: string;
    textWrongAnswer: string;
    answers: Array<{
      answersId: string;
      answer: string;
      isCorrect: boolean;
      point: number;
    }>;
  }
export  interface UserAnswer {
    fullName: string;
    email: string;
    answers: string[];
    totalPoint: number;
  }

  // Interfaccia per rappresentare i dati dell'utente
export interface UserData {
  username: string;
  email: string;
}