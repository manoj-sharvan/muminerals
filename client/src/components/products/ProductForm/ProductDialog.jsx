import React, { useEffect } from "react";
import { Dialog, DialogTitle, DialogContent, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ProductForm from "./ProductForm";
import "react-toastify/dist/ReactToastify.css";
import { showToast } from "../../utills/toastConfig";
import { createProduct ,updateProduct} from "../../services/masterProductServices/masterProductServices";

const ProductDialog = ({
  open,
  onClose,
  title,
  width,
  isEditing,
  editData,
}) => {
  const handleSubmit = async (data) => {
    const formData = [
      {
        description: data.productName,
        hsn: data.hsnCode,
        createdAt: new Date(),
        createdBy: "admin",
      },
    ];

    try {
      await createProduct(formData);
      showToast("Product created successfully", "success");
      onClose();
    } catch (error) {
      showToast("Something went wrong", "error", error);
    }
  };

  const handleCancel = () => {
    onClose(); // Simply close the dialog without submitting
  };

  const notify = () => {
    showToast("Please close the form before proceeding", "error"); // Example: Show error toast
  };
  
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (open) {
        event.preventDefault();
        event.returnValue = ""; // Needed for Chrome
        showToast("Please close the form before refreshing", "error");
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [open]);
  return (
    <Dialog
      fullWidth
      maxWidth={width}
      open={open}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {title}
        <IconButton onClick={handleCancel} aria-label="close">
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <ProductForm
          isEditing={isEditing}
          editData={editData}
          onSubmit={handleSubmit}
          handleCancel={handleCancel}
        />
      </DialogContent>
    </Dialog>
  );
};

export default ProductDialog;
