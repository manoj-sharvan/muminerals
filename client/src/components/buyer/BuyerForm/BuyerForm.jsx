import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { DialogActions, Button, TextField } from "@mui/material";

const BuyerForm = ({ onSubmit, handleCancel, isEditing, editData }) => {
  const [cities, setCities] = useState([]);
  const [locationData, setLocationData] = useState({
    country: "",
    state: "",
    city: "",
  });
  
  const defaultValues = {
    _id: isEditing ? editData?._id : undefined,
    companyName: isEditing ? editData?.companyName : "",
    address: isEditing ? editData?.address : "",
    pincode: isEditing ? editData?.pincode : "",
    country: isEditing ? editData?.country : locationData.country,
    state: isEditing ? editData?.state : locationData.state,
    city: isEditing ? editData?.city : locationData.city,
    phone: isEditing ? editData?.contactNumber1 : "",
    phone2: isEditing ? editData?.contactNumber2 : "",
    gstin: isEditing ? editData?.gstin : "",
  };

  const { control, handleSubmit, formState: { errors, isDirty } } = useForm({
    defaultValues,
    mode: "onChange",
  });

  const handleFormSubmit = (formData, event) => {
    event.preventDefault();
    const isOutsideTN = !formData.gstin.startsWith("33");
    onSubmit({
      ...formData,
      _id: formData._id,
      outsideTN: isOutsideTN,
      contactNumber1: formData.phone,
      contactNumber2: formData.phone2,
    });
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <div className="mb-4">
        <Controller
          name="companyName"
          control={control}
          rules={{ required: "Company name is required" }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Company Name"
              variant="outlined"
              fullWidth
              error={Boolean(errors.companyName)}
              helperText={errors.companyName?.message}
              margin="normal"
            />
          )}
        />
      </div>

      <div className="mb-4">
        <Controller
          name="address"
          control={control}
          rules={{ required: "Address is required" }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Address"
              variant="outlined"
              fullWidth
              error={Boolean(errors.address)}
              helperText={errors.address?.message}
              margin="normal"
            />
          )}
        />
      </div>

      <div className="mb-4">
        <Controller
          name="pincode"
          control={control}
          rules={{
            required: "Pincode is required",
            pattern: {
              value: /^\d{6}$/, // Regex for exactly 6 digits
              message: "Enter a valid pincode",
            },
          }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Pincode"
              variant="outlined"
              fullWidth
              error={Boolean(errors.pincode)}
              helperText={errors.pincode?.message}
              margin="normal"
              onChange={(e) => {
                field.onChange(e);
              }}
            />
          )}
        />
      </div>

      <div className="mb-4">
        <Controller
          name="country"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Country"
              variant="outlined"
              fullWidth
              margin="normal"
              error={Boolean(errors.country)}
              helperText={errors.country?.message}
            />
          )}
        />
      </div>

      <div className="mb-4">
        <Controller
          name="state"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="State"
              variant="outlined"
              fullWidth
              margin="normal"
              error={Boolean(errors.state)}
              helperText={errors.state?.message}
            />
          )}
        />
      </div>

      <div className="mb-4">
        <Controller
          name="city"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="City"
              variant="outlined"
              fullWidth
              margin="normal"
              error={Boolean(errors.city)}
              helperText={errors.city?.message}
            />
          )}
        />
      </div>

      <div className="mb-4">
        <Controller
          name="phone"
          control={control}
          rules={{
            required: "Phone number is required",
            pattern: {
              value: /^(\+\d{1,3}[- ]?)?\d{10,15}$/,
              message: "Enter a valid phone number",
            },
          }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Phone"
              variant="outlined"
              fullWidth
              margin="normal"
              error={Boolean(errors.phone)}
              helperText={errors.phone?.message}
              onKeyDown={(e) => {
                if (!/[0-9]/.test(e.key) && e.key !== "Backspace" && e.key !== "Delete" && e.key !== "Tab") {
                  e.preventDefault();
                }
              }}
            />
          )}
        />
      </div>

      <div className="mb-4">
        <Controller
          name="phone2"
          control={control}
          rules={{
            required: "Phone number is required",
            pattern: {
              value: /^(\+\d{1,3}[- ]?)?\d{10,15}$/,
              message: "Enter a valid phone number",
            },
          }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Phone 2"
              variant="outlined"
              fullWidth
              margin="normal"
              error={Boolean(errors.phone2)}
              helperText={errors.phone2?.message}
              onKeyDown={(e) => {
                if (!/[0-9]/.test(e.key) && e.key !== "Backspace" && e.key !== "Delete" && e.key !== "Tab") {
                  e.preventDefault();
                }
              }}
            />
          )}
        />
      </div>

      <div className="mb-4">
        <Controller
          name="gstin"
          control={control}
          rules={{
            required: "GSTIN is required",
            pattern: {
              value: /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[A-Z0-9]{1}[Z]{1}[A-Z0-9]{1}$/, // Updated regex for GSTIN format
              message: "Enter a valid GSTIN",
            },
          }}
          render={({ field }) => (
            <TextField
              {...field}
              label="GSTIN"
              variant="outlined"
              fullWidth
              margin="normal"
              error={Boolean(errors.gstin)}
              helperText={errors.gstin?.message}
            />
          )}
        />
      </div>

      <DialogActions>
        <Button onClick={handleCancel} color="primary">
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={!isDirty}
          variant="contained"
          color="primary"
        >
          {isEditing ? "Update" : "Create"}
        </Button>
      </DialogActions>
    </form>
  );
};

export default BuyerForm;
