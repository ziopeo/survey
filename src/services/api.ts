import axios from "axios";
import  {UserAnswer} from "./interfaces"
export const getQuestions = async () => {
const result = await axios.get("http://localhost:3001/questions");
return result.data;
};

export const addUserAnswer = async (newUser: UserAnswer) => {
try {
const response = await axios.post("http://localhost:3001/userAnswers", newUser);
console.log(response.data);
} catch (error) {
console.error(error);
}
};