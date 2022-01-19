import axios from 'axios';

interface Options {
  hostname: string;
  port?: number;
  path: string;
  queryParameters?: { [key: string]: string };
}

export class HttpService {
  static async get<T>(options: Options): Promise<T> {
    const response = await axios.get<T>(
      options.hostname +
        this.getPathWithQueryParams(options.path, options.queryParameters)
    );
    return response.data;
  }

  private static getPathWithQueryParams(
    path: string,
    queryParams?: { [key: string]: string }
  ): string {
    const newPath = path.charAt(0) === '/' ? path : `/${path}`;
    return queryParams
      ? `${newPath}?${Object.keys(queryParams)
          .map((key) => `${key}=${queryParams[key]}`)
          .join('&')}`
      : newPath;
  }
}
