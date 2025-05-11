import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import React, { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createProduct } from "../../State/Product/Action";

const initialSizes = [
  { name: "S", quantity: 0 },
  { name: "M", quantity: 0 },
  { name: "L", quantity: 0 },
];

const initialProductData = {
  imageUrl: "",
  brand: "",
  title: "",
  color: "",
  discountedPrice: "",
  price: "",
  discountPresent: "",
  size: initialSizes,
  quantity: 0,
  topLevelCategory: "",
  secondLevelCategory: "",
  thirdLevelCategory: "",
  description: "",
};

const CreateProductForm = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector(state => state.products);

  const [productData, setProductData] = useState(initialProductData);
  const [successMessage, setSuccessMessage] = useState(false); // State for Snackbar

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setProductData((prevState) => {
      const updatedData = {
        ...prevState,
        [name]: value,
      };

      if (name === "price" || name === "discountedPrice") {
        const price = parseFloat(updatedData.price);
        const discountedPrice = parseFloat(updatedData.discountedPrice);

        if (price && discountedPrice) {
          const discount = ((price - discountedPrice) / price) * 100;
          updatedData.discountPresent = discount.toFixed(2);
        }
      }

      setProductData((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));

      return updatedData;
    });
  };

  const handleSizeChange = (e, index) => {
    let { name, value } = e.target;
    name = name === "size_quantity" ? "quantity" : e.target.name;

    const sizes = [...productData.size];
    sizes[index][name] = value;
    setProductData((prevState) => {
      const totalSizeQuantity = sizes.reduce(
        (sum, size) => sum + parseInt(size.quantity || 0),
        0
      );

      return {
        ...prevState,
        size: sizes,
        quantity: totalSizeQuantity,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    if (!validateForm()) {
      return; // Stop form submission if validation fails
    }
  
    dispatch(createProduct(productData));
  
    setSuccessMessage(true); // Show success message
  
    setTimeout(() => {
      setSuccessMessage(false); // Hide message
  
      // Reset the form and create a fresh copy of initialSizes
      setProductData({
        ...initialProductData,
        size: initialSizes.map((size) => ({ ...size })), // Create new array with new objects
      });
    }, 2000);
  };
  

  const [errors, setErrors] = useState({});
   
  const validateForm = () => {
    let newErrors = {};

    if (!productData.imageUrl) newErrors.imageUrl = "Image URL is required";
    if (!productData.brand) newErrors.brand = "Brand is required";
    if (!productData.title) newErrors.title = "Title is required";
    if (!productData.color) newErrors.color = "Color is required";

    if (!productData.price) newErrors.price = "Price is required";
    else if (productData.price <= 0) newErrors.price = "Price must be positive";

    if (!productData.discountedPrice) {
      newErrors.discountedPrice = "Discounted Price is required";
    } else if (productData.discountedPrice <= 0) {
      newErrors.discountedPrice = "Discounted Price must be positive";
    } else if (parseFloat(productData.discountedPrice) > parseFloat(productData.price)) {
      newErrors.discountedPrice = "Discounted Price cannot be greater than Price";
    }

    if (!productData.description) newErrors.description = "Description is required";
    if (!productData.topLevelCategory) newErrors.topLevelCategory = "Select a category";
    if (!productData.secondLevelCategory) newErrors.secondLevelCategory = "Select a sub-category";
    if (!productData.thirdLevelCategory) newErrors.thirdLevelCategory = "Select a third-level category";

    productData.size.forEach((size, index) => {
      if (!size.quantity || size.quantity < 1 || size.quantity > 100) {
        newErrors[`size-${index}`] = "Quantity must be between 1 and 100";
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <div className="px-8 py-2">
      <Fragment>
        <Typography variant="h4" className="py-8 text-center">
          Add new Product
        </Typography>
        <form onSubmit={handleSubmit} className="min-h-screen">
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Image Url"
                name="imageUrl"
                value={productData.imageUrl}
                onChange={handleChange}
                error={!!errors.imageUrl}
                helperText={errors.imageUrl}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Brand"
                name="brand"
                value={productData.brand}
                onChange={handleChange}
                error={!!errors.brand}
                helperText={errors.brand}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Title"
                name="title"
                value={productData.title}
                onChange={handleChange}
                error={!!errors.title}
                helperText={errors.title}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Color"
                name="color"
                value={productData.color}
                onChange={handleChange}
                error={!!errors.color}
                helperText={errors.color}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Price"
                name="price"
                value={productData.price}
                onChange={handleChange}
                type="number"
                error={!!errors.price}
                helperText={errors.price}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Discounted Price"
                name="discountedPrice"
                value={productData.discountedPrice}
                onChange={handleChange}
                type="number"
                error={!!errors.discountedPrice}
                helperText={errors.discountedPrice}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Discount Present (%)"
                name="discountPresent"
                value={productData.discountPresent}
                type="number"
                disabled
              />
            </Grid>
            <Grid item xs={6} sm={4}>
              <FormControl fullWidth error={!!errors.topLevelCategory}>
                <InputLabel>Top Level Category</InputLabel>
                <Select
                  name="topLevelCategory"
                  value={productData.topLevelCategory}
                  onChange={handleChange}
                >
                  <MenuItem value="men">Men</MenuItem>
                  <MenuItem value="women">Women</MenuItem>
                  <MenuItem value="kids">Kids</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6} sm={4}>
              <FormControl fullWidth error={!!errors.secondLevelCategory}>
                <InputLabel>Second Level Category</InputLabel>
                <Select
                  name="secondLevelCategory"
                  value={productData.secondLevelCategory}
                  onChange={handleChange}
                >
                  <MenuItem value="clothing">Clothing</MenuItem>
                  <MenuItem value="accessories">Accessories</MenuItem>
                  <MenuItem value="brands">Brands</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6} sm={4}>
              <FormControl fullWidth error={!!errors.thirdLevelCategory}>
                <InputLabel>Third Level Category</InputLabel>
                <Select
                  name="thirdLevelCategory"
                  value={productData.thirdLevelCategory}
                  onChange={handleChange}
                >
                  <MenuItem value="top">Tops</MenuItem>
                  <MenuItem value="women_dress">Dresses</MenuItem>
                  <MenuItem value="t-shirts">T-shirts</MenuItem>
                  <MenuItem value="saree">Saree</MenuItem>
                  <MenuItem value="lengha_choli">Lengha Choli</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="description"
                label="Description"
                multiline
                rows={3}
                onChange={handleChange}
                value={productData.description}
                error={!!errors.description}
                helperText={errors.description}
              />
            </Grid>
            {productData.size.map((size, index) => (
              <Grid container item spacing={3} key={index}>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label="Size Name" value={size.name} disabled />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Quantity"
                    name="size_quantity"
                    type="number"
                    value={size.quantity}
                    onChange={(event) => handleSizeChange(event, index)}
                    inputProps={{ min: 1, max: 100 }}
                    error={!!errors[`size-${index}`]}
                    helperText={errors[`size-${index}`]}
                  />
                </Grid>
              </Grid>
            ))}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Total Quantity"
                name="quantity"
                value={productData.quantity}
                type="number"
                disabled
              />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" sx={{ p: 1.8 }} size="large" type="submit">
                Add new Product
              </Button>
            </Grid>
          </Grid>
        </form>

        {/* Success Snackbar */}
        <Snackbar open={successMessage} autoHideDuration={2000} onClose={() => setSuccessMessage(false)}>
          <Alert onClose={() => setSuccessMessage(false)} severity="success" sx={{ width: "100%" }}>
            Product Created Successfully!
          </Alert>
        </Snackbar>
      </Fragment>
    </div>
  );
};

export default CreateProductForm;