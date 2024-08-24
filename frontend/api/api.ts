import axios from "axios";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

export const searchData = async (query: string) => {
  //   const params = new URLSearchParams(query);
  return instance.get("/model/search?prompt=" + query);
};
