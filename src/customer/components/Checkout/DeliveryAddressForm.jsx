import React, { useState } from "react";
import { Button, Grid, Box, TextField } from "@mui/material";
import { useDispatch } from "react-redux";
import { createOrder } from "../../../State/Order/Action";
import { useNavigate } from "react-router-dom";

const DeliveryAddressForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // State for form fields and validation errors
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    city: "",
    state: "",
    zipCode: "",
    phoneNumber: "",
  });

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    city: "",
    state: "",
    zipCode: "",
    phoneNumber: "",
  });

  // Regex patterns
  const letterRegex = /^[A-Za-z]+$/; // Only letters
  const numberRegex = /^[0-9]+$/; // Only numbers

  // Handle input change with validation
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    let errorMessage = "";

    // Validation based on field type
    if (["firstName", "lastName", "city", "state"].includes(name)) {
      if (!letterRegex.test(value)) {
        errorMessage = "Only letters are allowed";
      }
    } else if (name === "zipCode") {
      if (!numberRegex.test(value) || value.length !== 6) {
        errorMessage = "Zip Code must be exactly 6 digits";
      }
    } else if (name === "phoneNumber") {
      if (!numberRegex.test(value) || value.length !== 10) {
        errorMessage = "Phone Number must be exactly 10 digits";
      }
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: errorMessage,
    }));
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();

    // Final validation check before submitting
    if (Object.values(errors).some((error) => error)) {
      return;
    }

    const data = new FormData(e.currentTarget);

    const address = {
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
      streetAddress: data.get("address"),
      city: data.get("city"),
      state: data.get("state"),
      zipCode: data.get("zipCode"),
      mobile: data.get("phoneNumber"),
    };

    const orderData = { address, navigate };

    dispatch(createOrder(orderData));
    console.log("address: ", address);
  };

  // Function to determine background color based on validation result
  const getFieldBackgroundColor = (fieldName) => {
    if (errors[fieldName]) {
      return "#f8d7da"; // Invalid fields (red)
    } else if (formData[fieldName]) {
      return "#d4edda"; // Valid fields (green)
    }
    return ""; // No background if field is empty
  };

  return (
    <div>
      <Grid container spacing={4} justifyContent="center" alignItems="center">
        <Grid item xs={12} lg={8}>
          <Box className="border rounded-s-md shadow-md p-5">
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                {/* First Name */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="firstName"
                    name="firstName"
                    label="First Name"
                    fullWidth
                    value={formData.firstName}
                    onChange={handleChange}
                    error={!!errors.firstName}
                    helperText={errors.firstName}
                    sx={{
                      backgroundColor: getFieldBackgroundColor("firstName"),
                    }}
                  />
                </Grid>

                {/* Last Name */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="lastName"
                    name="lastName"
                    label="Last Name"
                    fullWidth
                    value={formData.lastName}
                    onChange={handleChange}
                    error={!!errors.lastName}
                    helperText={errors.lastName}
                    sx={{
                      backgroundColor: getFieldBackgroundColor("lastName"),
                    }}
                  />
                </Grid>

                {/* Address */}
                <Grid item xs={12}>
                  <TextField
                    required
                    id="address"
                    name="address"
                    label="Address"
                    fullWidth
                    multiline
                    rows={4}
                  />
                </Grid>

                {/* City */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="city"
                    name="city"
                    label="City"
                    fullWidth
                    value={formData.city}
                    onChange={handleChange}
                    error={!!errors.city}
                    helperText={errors.city}
                    sx={{
                      backgroundColor: getFieldBackgroundColor("city"),
                    }}
                  />
                </Grid>

                {/* State */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="state"
                    name="state"
                    label="State / Province / Region"
                    fullWidth
                    value={formData.state}
                    onChange={handleChange}
                    error={!!errors.state}
                    helperText={errors.state}
                    sx={{
                      backgroundColor: getFieldBackgroundColor("state"),
                    }}
                  />
                </Grid>

                {/* Zip Code */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="zipCode"
                    name="zipCode"
                    label="Zip / Postal Code"
                    fullWidth
                    value={formData.zipCode}
                    onChange={handleChange}
                    error={!!errors.zipCode}
                    helperText={errors.zipCode}
                    sx={{
                      backgroundColor: getFieldBackgroundColor("zipCode"),
                    }}
                  />
                </Grid>

                {/* Phone Number */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="phoneNumber"
                    name="phoneNumber"
                    label="Phone Number"
                    fullWidth
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    error={!!errors.phoneNumber}
                    helperText={errors.phoneNumber}
                    sx={{
                      backgroundColor: getFieldBackgroundColor("phoneNumber"),
                    }}
                  />
                </Grid>

                {/* Submit Button */}
                <Grid item xs={12} sm={6}>
                  <Button
                    sx={{ py: 1.5, mt: 2, bgcolor: "RGB(145 85 253)" }}
                    size="large"
                    variant="contained"
                    type="submit"
                  >
                    Deliver Here
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default DeliveryAddressForm;
