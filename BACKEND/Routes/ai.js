const express=require('express');
const route=express.Router()
const Groq = require("groq-sdk");
const groq = new Groq({ apiKey: "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" });

route.post("/summarize",async(req,res)=>{
    const patientRecords = req.body.patientRecords; // Array of patient records
  console.log(req.body)
  
  if (!Array.isArray(patientRecords) || patientRecords.length === 0) {
    return res.status(400).json({ error: "Invalid or empty patient records." });
  }

  // Format records into a readable string for better summarization
  const formattedRecords = patientRecords
    .map((record, index) => 
      `#${index + 1}:\nDate: ${record.date}\nDiagnosis: ${record.diagnosis}\nPrescription: ${record.prescription}\nNotes: ${record.notes}`
    )
    .join("\n\n");

  try {
    const chatCompletion = await groq.chat.completions.create({
      model: "llama3-8b-8192", // Use a Groq-supported model
      messages: [
        {
          role: "system",
          content: `You are a medical records analyst specializing in extracting and prioritizing diseases based on severity and duration.
          
          **Task:** 
          - **Ignore minor conditions** (e.g., fever, cough, cold, mild infections).
          - **Identify serious and chronic diseases** (e.g., heart disease, diabetes, hypertension, stroke, cancer).
          - **Categorize diseases** into groups:
            - **Life-threatening Diseases** (e.g., heart attack, stroke, cancer)
            - **Chronic Conditions** (e.g., diabetes, hypertension, kidney disease)
            - **Infectious Diseases** (e.g., tuberculosis, pneumonia)
            - **Surgical History** (if any surgeries are recorded)
          - **Sort by priority:** Long-term diseases with multiple occurrences should be listed first.
          - Provide the report in this structured format:
          
          **Patient’s Major Medical History:**
          - **Life-threatening Diseases:**
            - [Disease] (First recorded: [Date], Last recorded: [Date])
          - **Chronic Conditions:**
            - [Disease] (First recorded: [Date], Last recorded: [Date])
          - **Infectious Diseases:**
            - [Disease] (First recorded: [Date], Last recorded: [Date])
          - **Surgical History:**
            - [Procedure] (Performed on: [Date])
          
          If no major issues exist, return: "No significant past health issues detected.`,
        },
        {
          role: "user",
          content: `Here are the patient's past medical records:\n\n${formattedRecords}\n\nSummarize the key issues and suggest possible treatments.`,
        },
      ],
    });

    res.json({ summary: chatCompletion.choices[0].message.content });
  } catch (error) {
    console.error("Error calling Groq API:", error.response ? error.response.data : error.message);
    res.status(500).json({ error: "Failed to generate summaries" });
  }
})

module.exports=route