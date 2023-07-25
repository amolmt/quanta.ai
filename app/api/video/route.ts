import { checkApiLimit, increaseApiLimit } from "@/lib/api-limit";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import Replicate from "replicate";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN!,
});

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { prompt } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!prompt) {
      return new NextResponse("Prompt is required", {
        status: 400,
      });
    }
    const freeTier = await checkApiLimit();

    if (!freeTier) {
      return new NextResponse("Free tier has expired.", {
        status: 403,
      });
    }

    const response = await replicate.run(
      "anotherjesse/zeroscope-v2-xl:9f747673945c62801b13b84701c783929c0ee784e4748ec062204894dda1a351",
      {
        input: {
          prompt,
        },
      }
    );

    await increaseApiLimit();
    return NextResponse.json(response);
  } catch (error: any) {
    console.log("[VIDEO_ERROR]", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
