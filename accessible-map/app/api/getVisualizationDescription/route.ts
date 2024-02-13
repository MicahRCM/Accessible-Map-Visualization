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
            text: `Please provide a detailed explanation of this data visualization map of Los Angeles County in the following image. This map includes a legend with key metrics such as the Justice Equity Need Index, System Involvement, Inequity Drivers, and Criminalization Risk. 
                     Each of these metrics is visually represented across different neighborhoods in LA County, with variations in color intensity indicating the level of each metric—darker areas signify higher levels, and lighter areas indicate lower levels. On the left hand side, the current metric being broadcast on the map is highlighted with a light grey background.
                     Additionally, the visualization contains metadata about a selected zip code, including its rank on the Justice Equity Need Index, its Service Planning Area, Supervisorial District, Countywide Statistical Area, and the specific neighborhood name.
                     Explain how these elements are organized on the map and in the legend, and provide an overview of the spatial distribution of the metrics across LA County. Highlight any patterns or notable areas of high or low metrics, and describe the general layout and geographical features of the county as they relate to the data presented.
                     Your output is intended to be read directly to a blind person (PWD) whom requires a clear understanding of the map's contents, as much significance of the various metrics as possible, and how they interact spatially across Los Angeles County. This will be used with their text-to-speech software and only the requested information should be output with no additional GPT-ish talk. This should NOT seem AI generated. The person will be getting results from you based on a button click and has no awareness of this prompt.`,
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
