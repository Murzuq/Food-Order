import { useContext } from "react";

import Modal from "./UI/Modal.jsx";
import CartContext from "../store/CartContext.jsx";
import { currencyFormatter } from "../util/formatting";
import Input from "./UI/Input.jsx";
import Button from "./UI/Button.jsx";
import UserProgressContext from "../store/UserProgressContext.jsx";

export default function Checkout() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  const cartTotal = cartCtx.items.reduce(
    (totalPrice, item) => totalPrice + item.quantity * item.price,
    0
  );

  function handleClose() {
    userProgressCtx.hideCheckout();
  }

  return (
    <Modal open={userProgressCtx.progress === "checkout"} onClose={handleClose}>
      <form action="">
        <h2>Checkout</h2>
        <p>Total Amoun: {currencyFormatter.format(cartTotal)}</p>

        <Input label="Full Name" id="full-name" />
        <Input label="E-Mail Address" type="email" id="email" />
        <Input label="Street" id="street" />
        <div className="control-rol">
          <Input label="Postal Code" id="postal-code" />
          <Input label="City" id="city" />
        </div>

        <p className="modal-actions">
          <Button type="button" textOnly onClick={handleClose}>
            Close
          </Button>
          <Button>Submit Oder</Button>
        </p>
      </form>
    </Modal>
  );
}
