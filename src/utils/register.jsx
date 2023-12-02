import axios from "axios";

export const RegisterUser = (input) => {
  return axios
    .post(`${process.env.REACT_APP_SERVER}/api/v1/auth/register`, input)
    .then((response) => {
      alert("register berhasil")
      window.location.href = "/login";

      console.log(response);
      return response.data; // You may return the response data if needed
    })
    .catch((error) => {
      // Handle errors here
      console.error("Error in register request:", error);
      throw error; // Re-throw the error to handle it in the calling code if necessary
    });
};
