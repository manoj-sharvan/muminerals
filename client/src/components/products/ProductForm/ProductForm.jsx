import React from "react";
import { useForm } from "react-hook-form";
import { DialogActions, Button } from "@mui/material";

const ProductForm = ({ onSubmit, handleCancel, isEditing, editData }) => {
  const FormData = {
    productName: isEditing ? editData?.ProductName : "",
    hsnCode: isEditing ? editData?.HSNCode : "",
    createdAt: isEditing ? editData?.createdAt : new Date(),
  };
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
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
      <div className="mb-4">
        <label
          htmlFor="productName"
          className="block text-sm font-medium text-gray-700"
        >
          Product Name
        </label>
        <input
          id="productName"
          {...register("productName", {
            required: "Product name is required",
          })}
          className="mt-1 p-2 block w-full border border-gray-300 rounded-sm shadow-sm focus:ring focus:ring-indigo-200"
        />
        {errors.productName && (
          <p className="mt-1 text-sm text-red-600">
            {errors.productName.message}
          </p>
        )}
      </div>

      <div className="mb-4">
        <label
          htmlFor="hsnCode"
          className="block text-sm font-medium text-gray-700"
        >
          HSN Code
        </label>
        <input
          id="hsnCode"
          {...register("hsnCode", {
            required: "HSN code is required",
            pattern: {
              value: /^\d{4,6}$/, // Regex for exactly 4-6 digits
              message: "Enter a valid HSN code",
            },
          })}
          className="mt-1 p-2 block w-full border border-gray-300 rounded-sm shadow-sm focus:ring focus:ring-indigo-200"
        />
        {errors.hsnCode && (
          <p className="mt-1 text-sm text-red-600">{errors.hsnCode.message}</p>
        )}
      </div>

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

export default ProductForm;
