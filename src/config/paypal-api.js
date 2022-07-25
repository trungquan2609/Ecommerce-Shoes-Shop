const fetch = require('node-fetch');
// const express = require('express');

const { PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET } = process.env;
const base = "https://api-m.sandbox.paypal.com";

// async function total(req, res, next) {
//   return req.session.cart.totalPrice ? res.session.cart.totalPrice : 0;
// }

async function createOrder() {
    const accessToken = await generateAccessToken();
    const url = `${base}/v2/checkout/orders`;
    const response = await fetch(url, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        intent: "CAPTURE",
        purchase_units: [
          {
            amount: {
              currency_code: "USD",
              value: "100",
            },
          },
        ],
      }),
    });
  
    return handleResponse(response);
  }
  
async function capturePayment(orderId) {
    const accessToken = await generateAccessToken();
    const url = `${base}/v2/checkout/orders/${orderId}/capture`;
    const response = await fetch(url, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
  
    return handleResponse(response);
  }
  
async function generateAccessToken() {
    const auth = Buffer.from(process.env.PAYPAL_CLIENT_ID + ":" + process.env.PAYPAL_CLIENT_SECRET).toString("base64");
    const response = await fetch(`${base}/v1/oauth2/token`, {
      method: "post",
      body: "grant_type=client_credentials",
      headers: {
        Authorization: `Basic ${auth}`,
      },
    });
  
    const jsonData = await handleResponse(response);
    return jsonData.access_token;
  }
  
async function handleResponse(response) {
    if (response.status === 200 || response.status === 201) {
      return response.json();
    }
  
    const errorMessage = await response.text();
    throw new Error(errorMessage);
  }

module.exports.createOrder = createOrder;
module.exports.capturePayment = capturePayment;
module.exports.generateAccessToken = generateAccessToken;
module.exports.handleResponse = handleResponse;
