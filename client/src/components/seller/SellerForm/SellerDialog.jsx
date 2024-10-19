import React, { useEffect } from "react";
import { Dialog, DialogTitle, DialogContent, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SellerForm from "./SellerForm";
import { showToast } from "../../utills/toastConfig";
import {
  createSeller,
  updateSeller,
} from "../../services/sellerServices/SellerServices"; // Import both create and update functions

const SellerDialog = ({
  open,
  onClose,
  title,
  width,
  isEditing,
  editData,
  apiCall,
}) => {
  const handleSubmit = async (data) => {
    const formData = {
      name: data.name,
      address: data.address,
      contact: data.contact.split(","),
      gstin: data.gstin,
      createdAt: new Date(),
      createdBy: "admin",
    };

    try {
      if (isEditing) {
        await updateSeller(editData._id, formData);
        showToast("Seller updated successfully", "success");
      } else {
        await createSeller(formData);
        showToast("Seller created successfully", "success");
      }
      onClose();
    } catch (error) {
      if (error.response && error.response.status === 400) {
        showToast(error.response.data.message, "error");
      } else {
        showToast("Something went wrong", "error", error);
      }
    }
  };

  const handleCancel = () => {
    onClose(); // Simply close the dialog without submitting
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
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <SellerForm
          isEditing={isEditing}
          editData={editData}
          onSubmit={handleSubmit}
          handleCancel={handleCancel}
        />
      </DialogContent>
    </Dialog>
  );
};

export default SellerDialog;
