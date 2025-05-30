const User = require("../Models/usersModel");
const {
  AIRTIME_RECEIPT,
  DATA_RECEIPT,
  ELECETRICITY_RECEIPT,
} = require("./TransactionReceipt");
const Data = require("../Models/dataModel");
const generateReceipt = require("./generateReceipt");
const CostPrice = require("../Models/costPriceModel");
const { v4: uuid } = require("uuid");
const BUYELECTRICITY = require("./APICALLS/Electricity/electricity");

const BUYAIRTIME = require("./APICALLS/Airtime/buyAirtime");
const BUYDATA = require("./APICALLS/Data/Data");
const { default: axios } = require("axios");
const { disco } = require("../API_DATA/disco");
const { default: mongoose } = require("mongoose");
// const buyAirtime = async (req, res) => {
//   const {
//     user: { userId, userType },
//     body: { mobile_number, amount, network },
//   } = req;
//   const isReseller = userType === "reseller";
//   const isApiUser = userType === "api user";
//   let amountToCharge = amount * 0.99;
//   if (isReseller || isApiUser) amountToCharge = amount * 0.99;
//   const user = await User.findById(userId);
//   if (!mobile_number || !amount || !network)
//     return res.status(400).json({ msg: "All fields are required" });
//   if (amount < 100)
//     return res.status(400).json({ msg: "Minimum purchase is 100" });
//   const { balance } = user;
//   if (balance < amountToCharge || balance - amountToCharge < 0)
//     return res
//       .status(400)
//       .json({ msg: "Insufficient balance. Kindly fund your wallet" });
//   await User.updateOne({ _id: userId }, { $inc: { balance: -amountToCharge } });
//   const { status, msg, apiResponseId } = await BUYAIRTIME({
//     network,
//     amount,
//     mobile_number,
//   });
//   let NETWORK = "";
//   if (network == "1") NETWORK = "MTN";
//   if (network == "2") NETWORK = "GLO";
//   if (network == "3") NETWORK = "AIRTEL";
//   if (network == "4") NETWORK = "9MOBILE";
//   if (status) {
//     const transactionId = uuid();
//     const payload = {
//       transactionId,
//       planNetwork: NETWORK,
//       status: "success",
//       planName: amount,
//       phoneNumber: mobile_number,
//       amountToCharge,
//       balance,
//       userId,
//       userName: user.userName,
//       type: "airtime",
//       apiResponseId,
//     };
//     const receipt = await generateReceipt(payload);
//     res.status(200).json({ msg: msg, receipt });
//   } else {
//     await User.updateOne(
//       { _id: userId },
//       { $inc: { balance: +amountToCharge } }
//     );
//     return res.status(500).json({
//       msg: msg || "Transaction failed",
//     });
//   }
// };
const buyAirtime = async (req, res) => {
  const session = await mongoose.startSession(); // Start a new session for the transaction
  session.startTransaction(); // Begin the transaction

  try {
    const {
      user: { userId, userType },
      body: { mobile_number, amount, network },
    } = req;
    const isReseller = userType === "reseller";
    const isApiUser = userType === "api user";
    let amountToCharge = amount * 0.99;
    if (isReseller || isApiUser) amountToCharge = amount * 0.99;

    const user = await User.findById(userId).session(session); // Associate the user query with the transaction
    if (!user) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ msg: "User not found" });
    }

    if (!mobile_number || !amount || !network) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({ msg: "All fields are required" });
    }
    if (amount < 100) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({ msg: "Minimum purchase is 100" });
    }

    const { balance } = user;
    if (balance < amountToCharge) {
      await session.abortTransaction();
      session.endSession();
      return res
        .status(400)
        .json({ msg: "Insufficient balance. Kindly fund your wallet" });
    }

    // Atomically update the user's balance within the transaction
    await User.updateOne(
      { _id: userId },
      { $inc: { balance: -amountToCharge } },
      { session } // Associate the update with the transaction
    );

    const { status, msg, apiResponseId } = await BUYAIRTIME({
      network,
      amount,
      mobile_number,
    });

    let NETWORK = "";
    if (network == "1") NETWORK = "MTN";
    if (network == "2") NETWORK = "GLO";
    if (network == "3") NETWORK = "AIRTEL";
    if (network == "4") NETWORK = "9MOBILE";
    // console.log('');
    if (status) {
      const transactionId = uuid();
      const payload = {
        transactionId,
        planNetwork: NETWORK,
        status: "success",
        planName: amount,
        phoneNumber: mobile_number,
        amountToCharge,
        balance: user.balance - amountToCharge, // Use the updated balance
        userId,
        userName: user.userName,
        type: "airtime",
        apiResponseId,
      };
      const receipt = await generateReceipt(payload);
      await session.commitTransaction(); // Commit the transaction if all operations succeed
      session.endSession();
      res.status(200).json({ msg: msg, receipt });
    } else {
      // If the airtime purchase fails, rollback the balance update
      await session.abortTransaction();
      session.endSession();
      return res.status(500).json({
        msg: msg || "Transaction failed",
      });
    }
  } catch (error) {
    // If any error occurs, rollback the transaction
    await session.abortTransaction();
    session.endSession();
    console.error("Error during airtime purchase:", error);
    return res.status(500).json({ msg: "Transaction failed due to an error" });
  }
};
const buyData = async (req, res) => {
  const {
    user: { userId, userType },
    body: { plan, mobile_number, network },
  } = req;
  // console.log(req.body);
  const isReseller = userType === "reseller";
  const isApiUser = userType === "api user";
  if (!plan || !mobile_number || !network)
    return res.status(400).json({ msg: "All fields are required" });
  const user = await User.findOne({ _id: userId });
  const { balance } = user;
  const dataTobuy = await Data.findOne({ id: plan });
  if (!dataTobuy)
    return res.status(400).json({ msg: "This data is not available" });
  const {
    resellerPrice,
    partnerPrice,
    apiPrice,
    plan_type,
    my_price,
    plan: dataVolume,
    volumeRatio,
    planCostPrice,
    isAvailable,
    plan_network,
  } = dataTobuy;
  if (!isAvailable)
    return res.status(400).json({
      msg: `${plan_network} ${plan_type} ${dataVolume} is currently unavailable. Try other plans `,
    });
  let amountToCharge = my_price;
  if (isReseller || isApiUser) amountToCharge = resellerPrice || my_price;
  if (balance < amountToCharge || balance - amountToCharge < 0)
    return res
      .status(400)
      .json({ msg: "Insufficient balance. Kindly fund your wallet" });
  await User.updateOne({ _id: userId }, { $inc: { balance: -amountToCharge } });
  let message;
  let receipt = {};
  let isSuccess = false;

  let NETWORK = "";
  if (network == "1") NETWORK = "MTN";
  if (network == "2") NETWORK = "GLO";
  if (network == "3") NETWORK = "AIRTEL";
  if (network == "6") NETWORK = "9MOBILE";
  // Checking the cost price of the data
  let { costPrice } = await CostPrice.findOne({ network: NETWORK });
  if (NETWORK === "MTN" && plan_type == "CG") {
    const { costPrice: CG_COST_PRICE } = await CostPrice.findOne({
      network: "MTN-CG",
    });
    costPrice = CG_COST_PRICE;
  }
  if (NETWORK === "MTN" && plan_type == "COUPON") {
    const { costPrice: COUPON_COST_PRICE } = await CostPrice.findOne({
      network: "MTN-COUPON",
    });
    costPrice = COUPON_COST_PRICE;
  }
  const { status, data, msg } = await BUYDATA({ ...req.body });

  isSuccess = status;
  if (status) {
    console.log({ ...data });
    receipt = await generateReceipt({
      transactionId: uuid(),
      planNetwork: NETWORK,
      planName: `${plan_type} ${dataVolume}`,
      phoneNumber: mobile_number,
      status: "success",
      amountToCharge,
      balance,
      userId,
      userName: user.userName,
      type: "data",
      volumeRatio: volumeRatio,
      costPrice: planCostPrice || costPrice * volumeRatio || amountToCharge,
      response: msg || "",
      planType: plan_type,
      ...data,
    });
  }
  if (isSuccess) {
    res.status(200).json({ msg, receipt });
  } else {
    await User.updateOne(
      { _id: userId },
      { $inc: { balance: +amountToCharge } }
    );
    return res.status(500).json({
      msg: msg || "Transaction failed",
    });
  }
};

const validateMeter = async (req, res) => {
  const { meterNumber, meterId, meterType } = req.body;
  console.log({ ...req.body });
  if (!meterNumber && !meterId)
    return res.status(400).json({ msg: "All fields are required" });
  try {
    const ValidateMeterResponse = await axios.post(
      `${process.env.DATARELOADED_API}/buy/validateMeter`,
      { meterNumber, meterId, meterType },
      {
        headers: {
          Authorization: process.env.DATARELOADED_API_KEY,
        },
      }
    );
    // console.log(ValidateMeterResponse);
    const { invalid, name, address } = ValidateMeterResponse.data;
    console.log({ invalid, name, address });
    res.status(200).json({ name, address });
  } catch (error) {
    console.log(error.response.data);
    res.status(500).json({
      msg: error.response.data.name || "An error occur.Please try again later",
    });
  }
};

const validateCableTv = async (req, res) => {
  res.status(500).json({
    msg: "An error occur.Please try again later",
  });
};

const buyElectricity = async (req, res) => {
  const { meterId, meterNumber, amount, meterType } = req.body;
  const { userId, userType } = req.user;
  const amountToCharge = parseFloat(amount) + 50;
  if (!meterId || !meterNumber || !amount || !meterType) {
    console.log(req.body);
    return res.status(400).json({ msg: "All fields are required" });
  }
  const user = await User.findById(userId);
  const { balance } = user;

  // if (amount < 1000)
  //   return res.status(400).json({ msg: "minimum purchase is 1000" });
  if (balance < amountToCharge || balance - amountToCharge < 0)
    return res
      .status(400)
      .json({ msg: "Insufficient balance. Kindly fund your wallet" });
  // Charging the user
  await User.updateOne({ _id: userId }, { $inc: { balance: -amountToCharge } });

  const response = await BUYELECTRICITY({ ...req.body });
  const { status, token, msg } = response;
  if (status) {
    const receipt = await ELECETRICITY_RECEIPT({
      package: "electricity token",
      Status: "success",
      token: token,
      meter_number: meterNumber,
      amountToCharge,
      balance,
      userId,
    });
    res.status(200).json({ msg: msg, receipt });
  } else {
    // return the charged amount
    await User.updateOne(
      { _id: userId },
      { $inc: { balance: amountToCharge } }
    );
    res.status(500).json({ msg: msg || "Transaction failed" });
  }
};
const buyCableTv = async (req, res) => {
  return res.status(400).json({ msg: "Not available at the moment" });
};
module.exports = {
  buyAirtime,
  buyData,
  buyElectricity,
  buyCableTv,
  validateCableTv,
  validateMeter,
};
