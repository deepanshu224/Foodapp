import React, { useEffect, useRef, useState } from "react";
import { useDispatchCart } from "./ContextReducer";
import { useCart } from "./ContextReducer";

function Card(props) {
  let dispatch = useDispatchCart();
  let options = props.options;
  let data = useCart();
  let priceRef = useRef();
  let priceOptions = Object.keys(options);

  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");

  let handleAddtoCart = async () => {
    let food = [];
    for (const item of data) {
      if (item.id === props.foodItem._id) {
        food = item;
        break;
      }
    }
    if (food) {
      if (food.size === size) {
        await dispatch({
          type: "UPDATE",
          id: props.foodItem._id,
          price: finalPrice,
          qty: qty,
        });
        return;
      } else if (food.size !== size) {
        await dispatch({
          type: "ADD",
          id: props.foodItem._id,
          name: props.foodItem.name,
          price: finalPrice,
          qty: qty,
          size: size,
        });
        return;
      }
      return;
    }
    await dispatch({
      type: "ADD",
      id: props.foodItem._id,
      name: props.foodItem.name,
      price: finalPrice,
      qty: qty,
      size: size,
    });
  };

  let finalPrice = qty * parseInt(options[size]);

  useEffect(() => {
    setSize(priceRef.current.value);
  }, []);

  return (
    <div>
      <div>
        <div
          className="card mt-3"
          style={{ width: "18rem", maxHeight: "500px" }}
        >
          <img
            className="card-img-top"
            src={props.foodItem.img}
            alt="Card image cap"
            style={{ height: "170px", objectFit: "fill" }}
          ></img>
          <div className="card-body">
            <h5 className="card-title">{props.foodItem.name}</h5>
            <div className="container w-10">
              <select
                className="m-2 h-100"
                style={{ backgroundColor: 'rgb(72, 207, 203)', color: '#ffffff', border: 'none', borderRadius: '0.25rem' }}
                onChange={(e) => setQty(e.target.value)}
              >
                {Array.from(Array(6), (e, i) => {
                  return (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  );
                })}
              </select>
              <select
                className="m-2 h-100"
                ref={priceRef}
                style={{ backgroundColor: 'rgb(72, 207, 203)', color: '#ffffff', border: 'none', borderRadius: '0.25rem' }}
                onChange={(e) => setSize(e.target.value)}
              >
                {priceOptions.map((data) => {
                  return (
                    <option key={data} value={data}>
                      {data}
                    </option>
                  );
                })}
              </select>
              <div className="d-inline h-100 fs-5">₹{finalPrice}/-</div>
            </div>
            <hr></hr>
            <button
              className="btn"
              style={{ backgroundColor: 'rgb(72, 207, 203)', color: '#ffffff' }}
              onClick={handleAddtoCart}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
