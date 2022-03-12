import { IPaymentParams } from "../utils/models";
import { NetworkService } from "./network.service";

class PaymentService {
  private base_url: string;
  private API_KEY: string;
  private request: any;

  constructor() {
    this.base_url = "https://api.paystack.co";
    this.API_KEY = process.env.REACT_APP_PAYSTACK_SECRET_KEY as string;

    this.request = new NetworkService(this.base_url);
  }

  public initializePayment = async (arg: IPaymentParams) => {
    const data = {
      ...arg,
      amount: arg.amount * 100,
    };

    const response = await this.request.post(
      "/transaction/initialize",
      data,
      this.API_KEY
    );

    return response.data;
  };

  public verifyPayment = async (reference: string) => {
    const response = await this.request.get({
      url: `/transaction/verify/${reference}`,
      token: this.API_KEY,
    });

    return response.data;
  };
}

const paymentService = new PaymentService();
export default paymentService;
