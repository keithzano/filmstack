export const api_key = process.env.REACT_APP_API_KEY;
export const baseURL = "https://api.themoviedb.org/3";
export const imageURL = "https://image.tmdb.org/t/p";
export const originalImage = (imgPath) => `${imageURL}/original/${imgPath}`;
export const w500Image = (imgPath) => `${imageURL}/w500/${imgPath}`;
export const customWidthImage = (imgPath, width) =>
  `${imageURL}/w${width}${imgPath}`;
