interface GeminiResponse {
  date: string;
  location: string;
  description: string;
  injuries: boolean;
  owner: boolean;
  complete: boolean;
  question: string;
  message?: string;
}

export default GeminiResponse;
