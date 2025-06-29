const Cart = require("../models/cartModel");
const Product = require("../models/productModel");

const getCart = async (userId, guestId) => {  
  if (userId) {
    return await Cart.findOne({ userId: userId });
  } else if (guestId) {
    return await Cart.findOne({ guestId });
  }
  return null;
};

const addToCart = async (req, res) => {
  const { productId, quantity, size, color, guestId, userId } = req.body;

  try {
    const product = await Product.findById(productId);

    if (!product) return res.status(404).json({ message: "Product Not Found" });

    // determine if the user is logged in or guest
    let cart = await getCart(userId, guestId);
    console.log(cart, "cart");
    

    if (cart) {
      const productIndex = cart.products.findIndex(
        (p) =>
          p.productId.toString() === productId &&
          p.size === size &&
          p.color === color
      );

      if (productIndex > -1) {
        cart.products[productIndex].quantity += quantity;
      } else {
        cart.products.push({
          productId,
          name: product.name,
          image: product.images[0].url,
          price: product.price,
          size,
          color,
          quantity,
        });
      }

      cart.totalPrice = cart.products.reduce((acc, item) => {
        return acc + item.price * item.quantity;
      }, 0);
      await cart.save();
      return res.status(200).json(cart);
    } else {
      const newCart = await Cart.create({
        userId: userId || undefined,
        guestId: guestId || "guest_" + new Date().getTime(),
        products: [
          {
            productId,
            name: product.name,
            image: product.images[0].url,
            price: product.price,
            size,
            color,
            quantity,
          },
        ],
        totalPrice: product.price * quantity,
      });

      return res.status(201).json(newCart);
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server Error" });
  }
};

const updateProductQuantity = async (req, res) => {
  const { productId, quantity, size, color, guestId, userId } = req.body;

  try {
    
    const cart = await getCart(userId, guestId);
    console.log(userId, guestId, "user guest");
    console.log(cart, "cart");
    

    
    if (!cart) return res.status(404).json({ message: "Cart not found" });
    const product = await Product.findById(productId);
    console.log(product, "product");
    

    if (!product) return res.status(404).json({ message: "Product not found" });

    const productIndex = cart.products.findIndex(
      (p) =>
        p.productId.toString() === productId &&
        p.size === size &&
        p.color === color
    );

    console.log(productIndex, "prod");
    
    if (productIndex > -1) {
      // update quantity
      if (quantity > 0) {
        console.log(quantity, "qauantity");
        
        cart.products[productIndex].quantity = quantity;
      } else {
        cart.products.splice(productIndex, 1); // remove product if quantity is 0
      }
      cart.totalPrice = cart.products.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );
      await cart.save();
      return res.status(200).json(cart);
    } else {
      return res.status(404).json({ message: "Product not found in cart" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server Error" });
  }
};

const deleteCartProduct = async (req, res) => {
  const { userId, guestId, productId, size, color } = req.body;
  try {
    const cart = await getCart(userId, guestId);
    if (!cart) return res.status(404).json({ message: "Cart not found" });
    const product = await Product.findById(productId);

    if (!product) return res.status(404).json({ message: "Product not found" });

    const productIndex = cart.products.findIndex(
      (p) =>
        p.productId.toString() === productId &&
        p.size === size &&
        p.color === color
    );
    cart.products.splice(productIndex, 1);
    cart.totalPrice = cart.products.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    await cart.save();
    return res.status(200).json(cart);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server Error" });
  }
};

const getCartData = async (req, res) => {
  const { userId, guestId } = req.body;
  try {
    const cart = await getCart(userId, guestId);
    if (cart) {
      return res.status(200).json(cart);
    } else {
      return res.status(404).json({ message: "Cart not found" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server Error" });
  }
};

const mergeCartInLogin = async (req, res) => {
  const { guestId } = req.body;
  try {
    const guestCart = await Cart.findOne({ guestId });
    const userCart = await Cart.findOne({ userId: req.user._id });

    if (guestCart) {
      if (guestCart.products.length === 0) {
        return res.status(400).json("Guest cart is empty");
      }

      if (userCart) {
        // merge guest cart into user cart
        guestCart.products.forEach((guestItem) => {
          const productIndex = userCart.products.findIndex(
            (item) =>
              item.productId.toString() === guestItem.productId &&
              item.size === guestItem.size &&
              item.color === guestItem.color
          );

          if (productIndex > -1) {
            userCart.products[productIndex].quantity += guestItem.quantity;
          } else {
            userCart.products.push(guestItem);
          }
        });
        userCart.totalPrice = userCart.products.reduce((acc, item) => {
          return acc + item.price * item.quantity;
        }, 0);

        await userCart.save();

        // remove the guest cart after merging
        try {
          await Cart.findOneAndDelete({ guestId });
        } catch (error) {
          console.error("Error deleting guest cart:", error);
        }
        res.status(200).json(userCart);
      } else {
        // if the user has no existing cart, assign the guest cart to the user
        guestCart.userId = req.user._id;
        guestCart.guestId = undefined;

        await guestCart.save();
        res.status(200).json(guestCart)
      }
    }else{
        if(userCart){
            return res.status(200).json(userCart);
        }
        return res.status(404).json({message: "Guest cart not found"})
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  addToCart,
  updateProductQuantity,
  deleteCartProduct,
  getCartData,
  mergeCartInLogin,
};
