const Product = require("../models/productModel");

const createProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      discountPrice,
      countInStock,
      category,
      brand,
      sizes,
      colors,
      collections,
      material,
      gender,
      images,
      isFeatured,
      isPublished,
      tags,
      dimensions,
      weight,
      sku,
    } = req.body;

    const product = new Product({
      name,
      description,
      price,
      discountPrice,
      countInStock,
      category,
      brand,
      sizes,
      colors,
      collections,
      material,
      gender,
      images,
      isFeatured,
      isPublished,
      tags,
      dimensions,
      weight,
      sku,
      user: req.user._id,
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(500).send("Server Error");
  }
};

const updateProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      discountPrice,
      countInStock,
      category,
      brand,
      sizes,
      colors,
      collections,
      material,
      gender,
      images,
      isFeatured,
      isPublished,
      tags,
      dimensions,
      weight,
      sku,
    } = req.body;

    const product = await Product.findById(req.params.id);

    if (product) {
      product.name = name || product.name;
      product.description = description || product.description;
      product.price = price || product.price;
      product.discountPrice = discountPrice || product.discountPrice;
      product.countInStock = countInStock || product.countInStock;
      product.category = category || product.category;
      product.brand = brand || product.brand;
      product.sizes = sizes || product.sizes;
      product.colors = colors || product.colors;
      product.collections = collections || product.collections;
      product.material = material || product.material;
      product.gender = gender || product.gender;
      product.images = images || product.images;
      product.isFeatured =
        isFeatured !== undefined ? isFeatured : product.isFeatured;
      product.isPublished =
        isPublished !== undefined ? isPublished : product.isPublished;
      product.tags = tags || product.tags;
      product.dimensions = dimensions || product.dimensions;
      product.weight = weight || product.weight;
      product.sku = sku || product.sku;

      const updateProduct = await product.save();
      res.json(updateProduct);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      // remove the product from DB
      await product.deleteOne();
      return res.json({ message: "Product removed" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send("Server Error");
  }
};

const getProductsWithQuery = async (req, res) => {
  try {
    const {
      collection,
      size,
      color,
      gender,
      minPrice,
      maxPrice,
      sortBy,
      search,
      category,
      material,
      brand,
      limit,
    } = req.query;

    let query = {};

    // filter logic
    if (collection && collection.toLocaleLowerCase().trim() !== "all") {
      query.collections = collection;
    }

    if (category && category.toLocaleLowerCase() !== "all") {
      query.category = category;
    }

    if (material) {
      query.material = { $in: material.split(",") };
    }

    if (brand) {
      query.brand = { $in: brand.split(",") };
    }

    if (size) {
      query.sizes = { $in: size.split(",") };
    }

    if (color) {
      query.colors = { $in: [color] };
    }
    if (gender) {
      query.gender = gender;
    }

    if (minPrice || maxPrice) {
      query.price = {};

      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    // sort logic
    let sort = {};
    if (sortBy) {
      switch (sortBy) {
        case "priceAsc":
          sort = { price: 1 };
          break;
        case "priceDesc":
          sort = { price: -1 };
          break;
        case "popularity":
          sort = { rating: -1 };
          break;
        default:
          break;
      }
    }

    // fetch products

    
    console.log(query, "qu");
    console.log(sort, "sort");
    
    
    let products = await Product.find(query).sort(sort).limit(Number(limit));
    res.json(products);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    console.log(product, "product");

    if (product) {
      return res.json(product);
    } else {
      return res.status(404).json({ message: "Product Not Found" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({message: "Server Error"});
  }
};

const getSimilarProducts = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    const similarProducts = await Product.find({
      _id: { $ne: id },
      gender: product.gender,
      category: product.category,
    }).limit(4);
    return res.json(similarProducts);
  } catch (error) {
    console.log(error);
    return res.status(500).json({message: "Server Error"});
  }
};

const getBestSellerProduct = async (req, res) => {
  try {
    const bestSeller = await Product.findOne().sort({ rating: -1 });
    if (bestSeller) {
      res.json(bestSeller);
    } else {
      res.status(404).json({ message: "No best seller found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
};

const newArrivalsProducts = async (req, res) => {
  try {
    const newArrivals = await Product.find({}).sort({ createdAt: -1 }).limit(8);
    if (newArrivals) {
      res.json(newArrivals);
    } else {
      res.status(404).json({ message: "No new arrivals found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
};

module.exports = {
  createProduct,
  updateProduct,
  deleteProduct,
  getProductsWithQuery,
  getProductById,
  getSimilarProducts,
  getBestSellerProduct,
  newArrivalsProducts,
  getAllProducts,
};
