import axios, { AxiosRequestConfig, Method } from "axios";

type RequestParamsType = {
  url: string;
  method: Method | undefined;
  data?: {} | undefined;
  token?: string | null | undefined;
  params?: {} | undefined;
  contentType?: string | undefined;
};

class NetworkService {
  private BASE_URL: string;
  constructor(baseUrl: string) {
    this.BASE_URL = baseUrl;
  }

  private request = async ({
    method,
    url,
    data,
    token,
    params,
    contentType = "application/json",
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
        Authorization: `Bearer ${token}`,
      };
    }

    return await axios(config);
  };

  public get = async ({
    url,
    params,
    token,
  }: {
    url: string;
    token?: string | null;
    params?: Record<string, any>;
  }) => {
    return await this.request({
      method: "GET",
      url,
      token,
      params,
    });
  };

  public post = async (url: string, data: {}, token?: string | null) => {
    return await this.request({
      method: "POST",
      url,
      data,
      token,
    });
  };

  public put = async (url: string, data: {}, token?: string | null) => {
    return await this.request({
      method: "PUT",
      url,
      data,
      token,
    });
  };

  public delete = async (url: string, token?: string | null) => {
    return await this.request({
      method: "DELETE",
      url,
      token,
    });
  };
}

export { NetworkService };
