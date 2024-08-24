import axios from "axios";

const instance = axios.create({
  baseURL: "http:127.0.0.1:8000/api/v1/",
});

export const searchData = async (query: string) => {
  //   const params = new URLSearchParams(query);
  return instance.get("/search?prompt=" + query);
};

// export const getPastQueries = async () => {
//   return instance.get("getPast");
// };
