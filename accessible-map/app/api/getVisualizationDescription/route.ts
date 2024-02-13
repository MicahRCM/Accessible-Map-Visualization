import OpenAI from "openai"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY as string,
})

interface ImageAnalysisRequest extends Request {
  json(): Promise<{ imageUrl: string }>
}

/* 
API documentation for gpt-4-vision-preview. 
https://platform.openai.com/docs/guides/vision
This prompt deserves more engineering.
*/

export async function POST(req: ImageAnalysisRequest): Promise<Response> {
  const body = await req.json()
  const response = await openai.chat.completions.create({
    model: "gpt-4-vision-preview",
    messages: [
      {
        role: "user",
        content: [
          {
            type: "text",
            text: `Please provide a detailed explanation of this data visualization map of Los Angeles:`,
          },
          {
            type: "image_url",
            image_url: {
              url: body.imageUrl,
            },
          },
        ],
      },
    ],
    max_tokens: 4000,
  })
  return Response.json({ response: response.choices[0].message.content })
}
