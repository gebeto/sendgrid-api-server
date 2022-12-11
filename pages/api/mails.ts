import type { NextApiRequest, NextApiResponse } from "next";
import { Mail } from "../components/MailsTable";

type Data = {
  mails: Mail[];
};

export const mails: Mail[] = [];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    console.log(req.body.personalizations[0].to[0]);
    const date = new Date();
    mails.unshift({
      id: date.toISOString(),
      datetime: date.toISOString(),
      sender: req.body.from.email as string,
      receiver: req.body.personalizations[0].to[0].email as string,
      subject: req.body.subject as string,
      template_id: req.body.template_id,
      data: req.body.personalizations[0].dynamic_template_data,
    });
    res.status(202).send("");
    return;
  } else if (req.method === "GET") {
    res.json({ mails });
  }

  res.status(403);
}
