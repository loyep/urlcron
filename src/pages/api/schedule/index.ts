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
  const tasks = await prisma.task.findMany();
  console.log("tasks", tasks);
}
