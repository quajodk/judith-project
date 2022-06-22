import * as functions from "firebase-functions";
import { Webhook, resources } from "coinbase-commerce-node";

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
const { Event } = resources;
const webhookSecret = functions.config().keys.shared_secret;
let res: any;

export const webhook = functions.https.onRequest((request, response): any => {
  let event;
  let sign = request.headers["x-cc-webhook-signature"] as string;

  try {
    event = Webhook.verifyEventBody(
      request.rawBody as unknown as string,
      sign,
      webhookSecret
    );
    console.log("🚀 ~ file: index.ts ~ line 21 ~ webhook ~ event", event);
    res = event;
  } catch (error: any) {
    console.log(error);
    return response.status(400).send(error?.message);
  }

  response.status(200).send(`Webhook received: ${event.id}`);
});

export const get_event_response = functions.https.onRequest(
  (request, response): any => {
    if ([null, undefined, ""].includes(res)) {
      return response.status(400).json({
        success: false,
        data: null,
      });
    }
    const event_type = res.type;

    switch (event_type) {
      case "charge:confirmed":
        return response.status(200).json({
          success: true,
          message: "charge complete",
          data: res.data,
        });

      case "charge:failed":
        return response.status(400).json({
          success: false,
          message: "charge failed",
          data: res.data,
        });
      case "charge:resolved":
        return response.status(400).json({
          success: true,
          message: "charge resolved",
          data: res.data,
        });

      default:
        return response.status(400).json({
          success: false,
          message: "charge pending confirmation",
          data: res.data,
        });
    }
  }
);

export const get_event = functions.https.onRequest(
  async (request, response): Promise<any> => {
    const { event_id } = request.params;
    try {
      const event = await Event.retrieve(event_id);
      return response.status(200).json({
        success: true,
        data: event,
      });
    } catch (error) {
      return response.status(500).json({
        success: false,
        error,
      });
    }
  }
);
