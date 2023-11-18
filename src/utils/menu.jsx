import axios from "axios";

const url = "https://finalrpl-50ec8-default-rtdb.asia-southeast1.firebasedatabase.app/products.json";

export const ListMenu = async () => {
  try {
    const result = await axios.get(url);
    console.log(result);
    return result.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
