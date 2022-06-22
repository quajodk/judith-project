import { ICryptoPaymentParams, IPaymentParams } from "../utils/models";
import { NetworkService } from "./network.service";

const paystack_url = "https://api.paystack.co/transaction";
const coinbase = "https://api.commerce.coinbase.com";

const paystack_key = process.env.REACT_APP_PAYSTACK_SECRET_KEY;
const coinbase_key = process.env.REACT_APP_COINBASE_KEY;
class PaymentService {
  private base_url: string;
  private API_KEY?: string;
  private keys?: string | null;
  private request: any;

  constructor({
    base_url,
    API_KEY,
    api_keys = null,
  }: {
    base_url: string;
    API_KEY?: string;
    api_keys?: string | null;
  }) {
    this.base_url = base_url;
    this.API_KEY = API_KEY;
    this.keys = api_keys;

    this.request = new NetworkService({
      baseUrl: this.base_url,
      token: this.API_KEY,
      api_key: this.keys,
    });
  }

  public initializePayment = async (arg: IPaymentParams) => {
    const data = {
      ...arg,
      amount: arg.amount * 100,
    };

    const response = await this.request.post("/initialize", data);

    return response.data;
  };

  public verifyPayment = async (reference: string) => {
    const response = await this.request.get({
      url: `/verify/${reference}`,
    });

    return response.data;
  };

  public chargeCrypto = async (arg: ICryptoPaymentParams) => {
    const data = {
      ...arg,
      pricing_type: "fixed_price",
      description: "Crypto payment for my order",
      local_price: {
        amount: arg.local_price.amount.toString(),
        currency: "USD",
      },
    };
    const response = await this.request.post("/charges", data);

    return response.data;
  };

  public resolveCryptoPayment = async (reference: string) => {
    const response = await this.request.get({
      url: `/charges/${reference}`,
    });

    return response.data;
  };
}

const paymentService = new PaymentService({
  base_url: paystack_url,
  API_KEY: paystack_key as string,
});
const cryptoPaymentService = new PaymentService({
  base_url: coinbase,
  api_keys: coinbase_key as string,
});
export default paymentService;
export { cryptoPaymentService };
