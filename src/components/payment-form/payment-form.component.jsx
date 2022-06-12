import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

import CustomButton from "../custom-button/custom-button.component";

import "./payment-form.styles.scss";

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const paymentHandler = async (e) => {
    e.preventDefault();
    try {
      if (!stripe || !elements) {
        return;
      }

      const response = await fetch(
        "/.netlify/functions/create-payment-intent",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ amount: 10000 }),
        }
      );
      const data = await response.json();

      const {
        paymentIntent: { client_secret },
      } = data;

      const paymentResult = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: "Marko Zastavnikovic",
          },
        },
      });

      if (paymentResult.error) {
        alert(paymentResult.error);
      } else {
        if (paymentResult.paymentIntent.status === "succeeded") {
          alert("Payment Successful");
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="payment-form-container">
      <form className="form-container" onSubmit={paymentHandler}>
        <h2>Credit Card Payment:</h2>
        <CardElement />
        <CustomButton className="inverted-transparent">Pay now</CustomButton>
      </form>
    </div>
  );
};

export default PaymentForm;
