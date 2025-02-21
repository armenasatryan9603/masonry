import { fetchPhotos } from "@services/photoService";

self.onmessage = async (event) => {
  const { query, page } = event.data;
  const res = await fetchPhotos(query, page);
  self.postMessage(res);
};
