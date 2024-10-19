import React from "react";
import { useForm } from "react-hook-form";
import { DialogActions, Button } from "@mui/material";

const SellerForm = ({ onSubmit, handleCancel, isEditing, editData }) => {
  const FormData = {
    name: isEditing ? editData?.Name : "",
    address: isEditing ? editData?.Address : "",
    contact: isEditing ? editData?.Contact : "",
    gstin: isEditing ? editData?.GSTIN : "",
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm({
    defaultValues: FormData,
    mode: "onChange",
  });

  const handleFormSubmit = (formData, event) => {
    event.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      {/* Seller Name */}
      <div className="mb-4">
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700"
        >
          Seller Name
        </label>
        <input
          id="name"
          {...register("name", { required: "Seller name is required" })}
          className="mt-1 p-2 block w-full border border-gray-300 rounded-sm shadow-sm focus:ring focus:ring-indigo-200"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
        )}
      </div>

      {/* Address */}
      <div className="mb-4">
        <label
          htmlFor="address"
          className="block text-sm font-medium text-gray-700"
        >
          Address
        </label>
        <input
          id="address"
          {...register("address", { required: "Address is required" })}
          className="mt-1 p-2 block w-full border border-gray-300 rounded-sm shadow-sm focus:ring focus:ring-indigo-200"
        />
        {errors.address && (
          <p className="mt-1 text-sm text-red-600">{errors.address.message}</p>
        )}
      </div>

      {/* Contact */}
      <div className="mb-4">
        <label
          htmlFor="contact"
          className="block text-sm font-medium text-gray-700"
        >
          Contact
        </label>
        <input
          id="contact"
          {...register("contact", { required: "Contact is required" })}
          className="mt-1 p-2 block w-full border border-gray-300 rounded-sm shadow-sm focus:ring focus:ring-indigo-200"
        />
        {errors.contact && (
          <p className="mt-1 text-sm text-red-600">{errors.contact.message}</p>
        )}
      </div>

      {/* GSTIN */}
      <div className="mb-4">
        <label
          htmlFor="gstin"
          className="block text-sm font-medium text-gray-700"
        >
          GSTIN
        </label>
        <input
          id="gstin"
          {...register("gstin", {
            required: "GSTIN is required",
            pattern: {
              value: /^[0-9A-Z]{15}$/, // Regex for valid GSTIN (15 alphanumeric characters)
              message: "Enter a valid GSTIN",
            },
          })}
          className="mt-1 p-2 block w-full border border-gray-300 rounded-sm shadow-sm focus:ring focus:ring-indigo-200"
        />
        {errors.gstin && (
          <p className="mt-1 text-sm text-red-600">{errors.gstin.message}</p>
        )}
      </div>

      {/* Actions */}
      <DialogActions>
        <Button onClick={handleCancel} color="primary">
          Cancel
        </Button>
        <Button
          onClick={handleSubmit(handleFormSubmit)}
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

export default SellerForm;
