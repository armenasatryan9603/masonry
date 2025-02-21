import axios from "axios";

import { Photo, Photos } from "@/types/photos";

const AuthToken = "bHz0U1AHM3cvae4vwOuzXDnPPNB0luGILBs0QmKXkbhBeKtY8LKk1bEA";
const PhotoGalleryUrl = "https://api.pexels.com/v1/";

enum Action {
  Search = "search",
  Photo = "photos",
}

export const fetchPhotos = async (
  query: string,
  page: number
): Promise<Photos<Photo>> => {
  const res = await axios.get(`${PhotoGalleryUrl}${Action.Search}`, {
    headers: {
      Authorization: AuthToken,
    },
    params: { query, page, per_page: 25 },
  });
  return await res.data;
};

export const fetchPhoto = (id: string, setPhoto: (photo: Photo) => void) => {
  axios
    .get(`${PhotoGalleryUrl}${Action.Photo}/${id}`, {
      headers: {
        Authorization: AuthToken,
      },
    })
    .then((res) => {
      const photo = res.data;
      setPhoto(photo);
    })
    .catch();
};
