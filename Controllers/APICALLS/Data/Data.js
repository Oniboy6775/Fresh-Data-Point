const axios = require("axios");

const BUYDATA = async ({ network, mobile_number, plan }) => {
  console.log({ "req-key": process.env.DATARELOADED_API_KEY });
  console.log({ "req-URL": process.env.DATARELOADED_API });
  try {
    const BuyDataResponse = await axios.post(
      `${process.env.DATARELOADED_API}/buy/data`,
      // `http://localhost:4000/api/v1/buy/data`,
      {
        network: network,
        mobile_number: mobile_number,
        plan: plan,
      },
      {
        headers: {
          Authorization: process.env.DATARELOADED_API_KEY,
          "x-auth-apiKey": process.env.DATARELOADED_API_KEY,
        },
      }
    );
    return {
      status: true,
      msg: BuyDataResponse.data.msg || "Data Purchase successful",
      data: BuyDataResponse.data.receipt,
    };
  } catch (error) {
    // console.log(error.response);
    return {
      status: false,
      msg: error.response?.data.msg || "Transaction failed",
    };
  }
};
module.exports = BUYDATA;
