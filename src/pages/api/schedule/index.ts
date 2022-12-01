import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/server/db/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    queryScheduleTasks(req.body.date);
  } else {
    return res
      .status(405)
      .json({ message: "[X] Method not allowed: ", success: false });
  }
}

async function queryScheduleTasks(date: string) {
  const jobs = await prisma.job.findMany();
  console.log("jobs", jobs);
}
