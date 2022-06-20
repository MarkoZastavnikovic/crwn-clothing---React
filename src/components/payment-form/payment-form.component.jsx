import React, { useState } from "react";

import { useSelector, useDispatch } from "react-redux";

import { selectCartTotal } from "../../store/cart/cart.selector";
import { selectCurrentUser } from "../../store/user/user.selector";
import { selectDisplayName } from "../../store/user/user.selector";

import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

import { createActionClearAllItemsFromCart } from "../../store/cart/cart.action";

import CustomButton from "../custom-button/custom-button.component";

import Spinner from "../spinner/spinner.component";

import "./payment-form.styles.scss";

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const amount = useSelector(selectCartTotal);
  const currentUser = useSelector(selectCurrentUser);
  const displayName = useSelector(selectDisplayName);

  const [isProcessingPayments, setIsProcessingPayments] = useState(false);

  const dispatch = useDispatch();

  const paymentHandler = async (e) => {
    e.preventDefault();
    try {
      if (!currentUser) {
        alert("You need to sign in.");
        return;
      }

      if (amount === 0) {
        return;
      }

      if (!stripe || !elements) {
        return;
      }

      setIsProcessingPayments(true);

      const response = await fetch(
        "/.netlify/functions/create-payment-intent",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ amount: amount * 100 }),
        }
      );

      const data = await response.json();

      if (!response.ok)
        throw new Error(
          `Something went wrong. (Error code: ${data.error.code}) (${response.status})`
        );

      if (!data.paymentIntent) {
        setIsProcessingPayments(false);
        return;
      }

      const {
        paymentIntent: { client_secret },
      } = data;

      const paymentResult = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: currentUser
              ? currentUser.displayName
                ? currentUser.displayName
                : displayName
                ? displayName
                : currentUser.email.split("@")[0]
              : "user",
          },
        },
      });

      if (paymentResult.error) {
        throw new Error(
          `${paymentResult.error.message} (Error code: ${paymentResult.error.code})`
        );
      } else if (
        paymentResult.paymentIntent &&
        paymentResult.paymentIntent.status === "succeeded"
      ) {
        alert("Payment successful.");
        dispatch(createActionClearAllItemsFromCart());
      } else if (paymentResult.paymentIntent) {
        throw new Error(
          `Payment status: ${paymentResult.paymentIntent.status}`
        );
      } else {
        throw new Error("Payment failed.");
      }

      setIsProcessingPayments(false);
    } catch (err) {
      console.error(`MARZ: Payment problem. ${err.message}`);
      alert(err.message);
      setIsProcessingPayments(false);
    }
  };

  return (
    <div className="payment-form-container">
      <form className="form-container" onSubmit={paymentHandler}>
        <h2>Credit Card Payment:</h2>
        <CardElement />
        <CustomButton
          disabled={isProcessingPayments}
          className="inverted-transparent payment"
        >
          {isProcessingPayments ? (
            <Spinner className="spinner-button" />
          ) : (
            "Pay now"
          )}
        </CustomButton>
      </form>
    </div>
  );
};

export default PaymentForm;
