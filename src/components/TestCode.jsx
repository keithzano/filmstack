const title = "The lion King";
const words = title.split(" ");
const urlSegment = `/${words.join("-")}`;
// urlSegment is now "/The-lion-King"
const Title = "The lion King";
const urlsegment = `/${title.split(" ").join("-")}`;
// urlSegment is now "/The-lion-King"
// GET   /movie/{movie_id}/similar
