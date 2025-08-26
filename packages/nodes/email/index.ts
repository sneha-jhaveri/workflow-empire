import { NodeImpl } from "..";
import { createTransport } from "nodemailer";

export const emailSendNode: NodeImpl = {
  type: "email.send",
  meta: {
    label: "Send Email",
    inputs: {
      to: "string",
      subject: "string",
      body: "string",
    },
    outputs: {
      messageId: "string",
    },
  },
  async run({ ctx, input }) {
    const transporter = createTransport(ctx.secrets.smtp);
    const info = await transporter.sendMail({
      from: ctx.secrets.smtp.from,
      to: input.to,
      subject: input.subject,
      html: input.body,
    });
    return { messageId: info.messageId };
  },
};

export default emailSendNode;
