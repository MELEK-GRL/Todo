import { Candidate } from "../store/candidateSlice";

export const initialCandidates: Candidate[] = [
  {
    name: "Melek Gürel",
    email: "melek@example.com",
    stage: "Interview",
    rating: 4.5,
    appliedJob: "Frontend developer",
    resume: "https://www.canva.com/search?q=cv%20t%C3%BCrk%C3%A7e",
  },
  {
    name: "Serkan Güneş",
    email: "serkan@example.com",
    stage: "Hired",
    rating: 4.8,
    appliedJob: "Product Manager",
    resume: "https://www.canva.com/search?q=cv%20t%C3%BCrk%C3%A7e",
  },
]; 