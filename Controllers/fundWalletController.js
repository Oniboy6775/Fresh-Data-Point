const Coupon = require("../Models/couponModel");
const User = require("../Models/usersModel");
const Transaction = require("../Models/transactionModel");
const axios = require("axios");
const { v4: uuid } = require("uuid");
const { COUPON_RECEIPT } = require("./TransactionReceipt");
const sha512 = require("js-sha512").sha512;
const jwt = require("jsonwebtoken");

const coupon = async (req, res) => {
  const { userId } = req.user;
  const user = await User.findById(userId);
  const { userName, coupon } = req.body;
  if (!coupon) return res.status(400).json({ msg: "Please enter Coupon" });
  if (!userName)
    return res.status(400).json({ msg: "Please Provide username" });
  try {
    const AvailableCoupon = await Coupon.findOne({
      couponCode: coupon,
    });
    if (!AvailableCoupon)
      return res.status(400).json({ msg: "Used or Invalid Coupon Code" });

    if (AvailableCoupon.couponOwner !== user.userName)
      return res
        .status(400)
        .json({ msg: "This Coupon belongs to another user" });
    if (AvailableCoupon.isUsed)
      return res.status(400).json({ msg: "Coupon code used" });
    if (userName !== user.userName)
      return res.status(400).json({ msg: "Unable to fund this account" });
    const { amount, couponCode, isUsed, couponOwner } = AvailableCoupon;

    if (isUsed) return res.status(400).json({ msg: "Coupon Code Used" });
    const response = await COUPON_RECEIPT({ user, amount, userId });
    // Adding coupon amount to user balance
    await User.updateOne(
      { _id: req.user.userId },
      { $inc: { balance: amount } }
    );
    await Coupon.findOneAndDelete({
      couponCode: couponCode,
      couponOwner: userName,
    });

    res.status(200).json({
      msg: `You have successfully fund your wallet with ${amount}`,
      amount: amount,
      receipt: response,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Crediting a user (monnify)
const monnify = async (req, res) => {
  res.sendStatus(200);
  const stringifiedBody = JSON.stringify(req.body);
  const computedHash = sha512.hmac(
    process.env.MONNIFY_API_SECRET,
    stringifiedBody
  );
  const monnifySignature = req.headers["monnify-signature"];
  if (!monnifySignature) return;
  if (monnifySignature != computedHash) return;

  const {
    eventType,
    eventData: {
      paidOn,
      settlementAmount,
      customer: { email },
    },
  } = req.body;
  if (eventType !== "SUCCESSFUL_TRANSACTION") return;
  if (!req.body.eventData.customer.email) return;
  let user = await User.findOne({ email });

  if (!user) return;
  const { _id, balance, userName } = user;
  // INCREMENT USER BALANCE
  await User.updateOne({ _id }, { $inc: { balance: settlementAmount } });
  // Generate transaction
  const transactionDetails = {
    trans_Id: uuid(),
    trans_By: _id,
    trans_Type: "wallet",
    trans_Network: `Auto-funding-SUCCESS||MNFY`,
    phone_number: `${userName}`,
    trans_amount: settlementAmount,
    balance_Before: balance,
    balance_After: balance + parseInt(settlementAmount),
    trans_Date: paidOn,
    trans_Status: "success",
    createdAt: Date.now(),
  };
  await Transaction(transactionDetails).save();
};
const vPay = async (req, res) => {
  console.log(req.body);
  let secret = req.headers["x-payload-auth"];
  let payload = jwt.decode(secret);
  secret = payload.secret;
  if (secret !== process.env.VPAY_SECRET_KEY) {
    console.log("secret key not match");
    console.log(secret, process.env.VPAY_SECRET_KEY);
    return;
  }
  console.log("secret matched!!!");
  const {
    amount,
    account_number,
    originator_account_name,
    originator_bank,
    originator_account_number,
    fee,
  } = req.body;
  // checking user to credit
  const userToCredit = await User.findOne({
    reservedAccountNo3: account_number,
  });
  if (!userToCredit) {
    console.log("User with the account does not exist");
    return;
  }
  // increasing user balance
  let totalCharges = fee;
  if (totalCharges > 100) totalCharges = 100;
  const amountToCredit = amount - totalCharges;
  await User.updateOne(
    { _id: userToCredit._id },
    {
      $inc: { balance: amountToCredit },
      $set: { trans_profit: fee > 100 ? 100 - fee : 0 },
    }
  );
  // generating receipt
  await generateReceipt({
    transactionId: uuid(),
    planNetwork: "Auto-funding||VFD",
    status: "success",
    planName: `₦${amount}`,
    phoneNumber: account_number,
    amountToCharge: amountToCredit,
    balance: userToCredit.balance,
    userId: userToCredit._id,
    userName: userToCredit.userName,
    type: "wallet",
    response: `${originator_account_name} ${originator_account_number} ${originator_bank}`,
    increased: true,
  });
  res.sendStatus(200);
};
module.exports = {
  coupon,
  monnify,
  vPay,
};
