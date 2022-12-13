import type { NextApiRequest, NextApiResponse } from "next";
import { Mail } from "../components/MailsTable";

type Data = {
  ok?: boolean;
  mails?: Mail[];
};

export const mails: Mail[] = [
  {
    id: "1",
    subject: "Subject test 1",
    sender: "asdadad@asdasd.asd",
    receiver: "asdadad@asdasd.asd",
    datetime: "2022-09-12T12:00:00+00:00",
    data: {
      test: 1,
    },
  },
  {
    id: "2",
    subject: "Subject test 2",
    sender: "asdadad@asdasd.asd",
    receiver: "asdadad@asdasd.asd",
    datetime: "2022-09-12T12:00:00+00:00",
    data: {
      test: 2,
    },
  },
];

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
    res.status(202).json({ ok: true });
    return;
  } else if (req.method === "GET") {
    res.json({ mails });
  }

  res.status(403).json({ ok: true });
}
