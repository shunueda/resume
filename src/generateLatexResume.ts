import { GoogleGenerativeAI } from '@google/generative-ai'
import { config } from 'package.json'

const generativeModel = new GoogleGenerativeAI(
  process.env.GOOGLE_API_KEY
).getGenerativeModel({
  model: config.model
})

export default async function generateLatexResume(
  input: string,
  template: string,
  description: string
) {
  const prompt = `
    Your task is to convert a resume from markdown format into a LaTeX document using a provided LaTeX template. 
    The resume should be tailored to a specific job description. 
    Please ensure that the resume content includes all relevant details mentioned in the job description. 
    Pay special attention to incorporating keywords from the job description, even if they are not originally present in the resume. 
    Make sure the final document is polished and aligns perfectly with the job requirements.
    
    Follow these steps:
    
    Step 1: Read the resume information provided in markdown format.
    Step 2: Read the provided LaTeX template.
    Step 3: Read the job description provided.
    Step 4: Convert the markdown resume into a LaTeX document using the template.
    Step 5: Tailor the resume content to align with the job description.
    Step 6: Ensure all special characters are properly escaped.
    Step 7: Use the resume information accurately, but correct any errors or confusing sentences.
    Step 8: Make improvements to the resume where possible to enhance clarity and presentation.
    
    The markdown resume, LaTeX template, and job description are provided below, surrounded by triple quotes.
    
    Resume in markdown:
    """
    ${input}
    """
    
    LaTeX template:
    """
    ${template}
    """
    
    Job description:
    """
    ${description}
    """
    
    Important:
    
    Do not output any instructions or notes; only output the LaTeX code.
    Ensure the final output is a clean, formatted LaTeX document.
    Please begin the conversion now.
  `
  const result = await generativeModel.generateContent(prompt)
  return result.response.text()
}
