import React, { useEffect } from "react";
import { Dialog, DialogTitle, DialogContent, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import "react-toastify/dist/ReactToastify.css";
import {
  createBuyer,
  getBuyers,
  updateBuyer,
} from "../services/buyerServices/buyerServices";
import { showToast } from "../utills/toastConfig";
import BuyerForm from "./BuyerForm/BuyerForm";

const BuyerDialog = ({ open, onClose, title, width, isEditing, editData }) => {
  
  const handleSubmit = async (data) => {
  console.log(data,"datadata")
    const formData = {
      companyName: data.companyName,
      address: data.address,
      pincode: data.pincode,
      country: data.country,
      state: data.state,
      city: data.city,
      gstin: data.gstin,
      outsideTN: data.outsideTN == "No" ? false : true,
      contactNumber1: data.contactNumber1,
      contactNumber2: data.contactNumber2,
    };

    try {
      if (data._id) {
        await updateBuyer(data._id, formData);
        showToast("Buyer updated successfully", "success");
      } else {
        await createBuyer(formData);
        showToast("Buyer created successfully", "success");
      }
      onClose();
      await getBuyers();
    } catch (error) {
      showToast("Something went wrong", "error", error);
    }
  };

  const handleCancel = () => {
    onClose();
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
        <BuyerForm
          isEditing={isEditing}
          editData={editData}
          onSubmit={handleSubmit}
          handleCancel={handleCancel}
        />
      </DialogContent>
    </Dialog>
  );
};

export default BuyerDialog;
