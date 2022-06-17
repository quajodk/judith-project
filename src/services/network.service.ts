import axios, { AxiosRequestConfig, Method } from "axios";

type RequestParamsType = {
  url: string;
  method: Method | undefined;
  data?: {} | undefined;
  token?: string | null | undefined;
  params?: {} | undefined;
  contentType?: string | undefined;
  keys?: string | null;
};

class NetworkService {
  private BASE_URL: string;
  private token?: string | null;
  private api_key?: string | null;
  constructor({
    baseUrl,
    token,
    api_key,
  }: {
    baseUrl: string;
    token?: string | null | undefined;
    api_key?: string | null | undefined;
  }) {
    this.BASE_URL = baseUrl;
    this.token = token;
    this.api_key = api_key;
  }

  private request = async ({
    method,
    url,
    data,
    token = this.token,
    params,
    contentType = "application/json",
    keys = this.api_key,
  }: RequestParamsType) => {
    const config: AxiosRequestConfig = {
      method,
      baseURL: this.BASE_URL,
      url,
      data,
      params,
    };
    config.headers = {
      "Content-Type": contentType,
    };

    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${this.token}`,
      };
    }

    if (keys) {
      config.headers = {
        ...config.headers,
        "X-CC-Api-Key": keys,
        "X-CC-Version": "2018-03-22",
      };
    }

    return await axios(config);
  };

  public get = async ({
    url,
    params,
  }: {
    url: string;

    params?: Record<string, any>;
  }) => {
    return await this.request({
      method: "GET",
      url,
      params,
    });
  };

  public post = async (url: string, data: {}, token?: string | null) => {
    return await this.request({
      method: "POST",
      url,
      data,
    });
  };

  public put = async (url: string, data: {}, token?: string | null) => {
    return await this.request({
      method: "PUT",
      url,
      data,
    });
  };

  public delete = async (url: string, token?: string | null) => {
    return await this.request({
      method: "DELETE",
      url,
    });
  };
}

export { NetworkService };
