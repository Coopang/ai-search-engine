import axios from "axios";

const instance = axios.create({
  baseURL: "http:172.18.58.115:8000/api/v1/",
});

export const searchData = async (query: string) => {
  //   const params = new URLSearchParams(query);
  return instance.get("/search?prompt=" + query);
};

export const getTrends = async () => {
  return instance.get("/trends");
};
