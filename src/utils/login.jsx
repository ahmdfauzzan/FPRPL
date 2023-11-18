import axios from "axios";
import Cookies from "js-cookie";

export const LoginUser = (input) => {
  return axios
    .post(`${process.env.REACT_APP_SERVER}/api/v1/auth/login`, input)
    .then((response) => {
      console.log(response);
      const token = response.data.data.token;

      console.log(token);

      // Menyimpan token ke dalam cookie
      Cookies.set("token", token, { expires: 7 }); // Misalnya, token disimpan selama 7 hari

      window.location.href = "/";
      // return response.data; // You may return the response data if needed
    })
    .catch((error) => {
      // Handle errors here
      console.error("Error in login request:", error);
      throw error; // Re-throw the error to handle it in the calling code if necessary
    });
};
