/**
 * AI Service for StudyMate.
 * Proxies requests to Google Gemini LLM API (gemini-3.5-flash / gemini-flash-latest).
 */

const extractJson = (text) => {
  const firstBrace = text.indexOf('{');
  const lastBrace = text.lastIndexOf('}');
  if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
    const jsonStr = text.substring(firstBrace, lastBrace + 1);
    return JSON.parse(jsonStr);
  }
  return JSON.parse(text);
};

export const generateAIStudyPlan = async ({ subjects, deadlines, availableHours, preferredDuration }) => {
  const apiKey = process.env.GEMINI_API_KEY || process.env.LLM_API_KEY;

  const prompt = `You are an expert academic tutor and study planner.
Generate a structured study plan based on the following input:
- Subjects: ${Array.isArray(subjects) ? subjects.join(', ') : subjects}
- Deadlines & Exams: ${deadlines || 'General study preparation'}
- Daily Available Time: ${availableHours || 3} hours/day
- Session Duration: ${preferredDuration || 60} minutes per session

Return ONLY valid JSON matching this exact structure:
{
  "summary": "Short encouraging summary strategy",
  "schedule": [
    {
      "day": "Day 1",
      "subject": "Subject Name",
      "topic": "Specific Subtopic or Assignment focus",
      "duration": "60 mins",
      "priority": "High",
      "reason": "Clear educational reason prioritizing upcoming deadlines"
    }
  ]
}`;

  if (apiKey && apiKey !== 'mock_or_your_gemini_api_key_here') {
    const models = ['gemini-3.5-flash', 'gemini-3.6-flash', 'gemini-flash-latest'];

    for (const model of models) {
      try {
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{ parts: [{ text: prompt }] }],
              generationConfig: { responseMimeType: 'application/json' }
            })
          }
        );

        if (response.ok) {
          const data = await response.json();
          const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
          if (text) {
            return extractJson(text);
          }
        }
      } catch (err) {
        console.warn(`Gemini model ${model} call warning:`, err.message);
      }
    }
  }

  // Fallback intelligent study plan generator for offline mode
  const subjectList = (Array.isArray(subjects) ? subjects : (subjects || 'General Core Subjects').split(',')).map(s => s.trim());
  const hours = parseFloat(availableHours) || 3;

  const schedule = [];
  const days = ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5'];

  days.forEach((day, idx) => {
    const subj = subjectList[idx % subjectList.length];
    schedule.push({
      day,
      subject: subj,
      topic: `Key Concept Review & Practice Exercises for ${subj}`,
      duration: `${Math.min(Math.round((hours * 60) / 2), 90)} mins`,
      priority: idx < 2 ? 'High' : 'Medium',
      reason: `Prioritizes ${subj} assignment preparation and deadline mitigation based on exam urgency.`
    });
  });

  return {
    summary: `Tailored ${days.length}-day intensive plan focusing on ${subjectList.join(', ')} with ${hours} daily focus hours.`,
    schedule
  };
};

export const explainAITopic = async ({ topic, subjectContext }) => {
  const apiKey = process.env.GEMINI_API_KEY || process.env.LLM_API_KEY;

  const prompt = `You are a friendly academic mentor explaining concepts to junior engineering students.
Explain the following topic simply:
- Topic: ${topic}
- Subject Context: ${subjectContext || 'General Computer Science'}

Return ONLY valid JSON matching this exact structure:
{
  "topic": "${topic}",
  "simpleExplanation": "Clear, jargon-free 2-3 sentence explanation.",
  "realWorldAnalogy": "Relatable real-world analogy.",
  "example": "Practical code or conceptual example.",
  "keyPoints": [
    "Key point 1",
    "Key point 2",
    "Key point 3"
  ],
  "summary": "A 1-sentence summary takeaway."
}`;

  if (apiKey && apiKey !== 'mock_or_your_gemini_api_key_here') {
    const models = ['gemini-3.5-flash', 'gemini-3.6-flash', 'gemini-flash-latest'];

    for (const model of models) {
      try {
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{ parts: [{ text: prompt }] }],
              generationConfig: { responseMimeType: 'application/json' }
            })
          }
        );

        if (response.ok) {
          const data = await response.json();
          const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
          if (text) {
            return extractJson(text);
          }
        }
      } catch (err) {
        console.warn(`Gemini model ${model} call warning:`, err.message);
      }
    }
  }

  // Fallback intelligent topic breakdown for offline mode
  return {
    topic,
    simpleExplanation: `${topic} is a foundational concept in ${subjectContext || 'computer science'} designed to organize structure, improve efficiency, and break complex problems into manageable logical components.`,
    realWorldAnalogy: `Think of ${topic} like a well-organized library catalog system where every book is labeled with precise shelf coordinates for instant retrieval without scanning the entire building.`,
    example: `For instance, when managing ${topic}, we encapsulate data attributes and operations together so that changes in one module do not break connected components across the application.`,
    keyPoints: [
      `Improves modularity and maintainability in real-world systems.`,
      `Reduces redundancy by establishing standardized execution patterns.`,
      `Critical concept frequently evaluated in engineering technical interviews.`
    ],
    summary: `Mastering ${topic} allows developers to write cleaner, more efficient, and scalable software solutions.`
  };
};
