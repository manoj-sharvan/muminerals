import React, { useEffect, useState, useMemo } from "react";
import { Button, Box, MenuItem, lighten } from "@mui/material";
import {
  MRT_GlobalFilterTextField,
  MRT_ToggleFiltersButton,
} from "material-react-table";
import GenericTable from "../../common/GridTable";
import BuyerDialog from "./BuyerDialog";
import { getBuyers } from "../services/buyerServices/buyerServices";

const Buyer = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [buyers, setBuyers] = useState([]);
  const [editData, setEditData] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  // Open the dialog for creating or editing buyers
  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  // Close the dialog and refresh the data
  const handleCloseDialog = async (isUpdated) => {
    setIsDialogOpen(false);
    if (isUpdated) {
      await fetchBuyers();
    }
  };

  // Fetch buyers from the API and update state
  const fetchBuyers = async () => {
    try {
      const response = await getBuyers();
      const updatedBuyers = response.buyers.map((buyer) => ({
        ...buyer,
        outsideTN: buyer.outsideTN !== false ? "Yes" : "No",
      }));

      setBuyers(updatedBuyers || []);
    } catch (error) {
      console.error("Failed to fetch buyers", error);
    }
  };

  useEffect(() => {
    fetchBuyers();
  }, []);

  // Define table columns
  const columns = useMemo(
    () => [
      { accessorKey: "CompanyName", header: "Company Name" },
      { accessorKey: "address", header: "Address" },
      { accessorKey: "pincode", header: "Pincode" },
      { accessorKey: "Country", header: "Country" },
      { accessorKey: "state", header: "State" },
      { accessorKey: "outsideTN", header: "Outside Tamil Nadu" },
      { accessorKey: "gstin", header: "GSTIN" },
    ],
    []
  );

  // Render action menu items for each row
  const renderRowActionMenuItems = ({ closeMenu, row }) => (
    <>
      <MenuItem
        key="edit"
        onClick={() => {
          setIsEditing(true);
          setEditData(row.original);
          handleOpenDialog();
          closeMenu();
        }}
      >
        Edit
      </MenuItem>
      <MenuItem
        key="delete"
        onClick={() => {
          alert(`Deleting ${row.original.CompanyName}`);
          closeMenu();
        }}
      >
        Delete
      </MenuItem>
    </>
  );

  // Render the top toolbar of the table
  const renderTopToolbar = ({ table }) => (
    <Box
      sx={(theme) => ({
        backgroundColor: lighten(theme.palette.background.default, 0.05),
        display: "flex",
        gap: "0.5rem",
        p: "8px",
        justifyContent: "space-between",
      })}
    >
      <Box sx={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
        <MRT_GlobalFilterTextField table={table} />
      </Box>
      <Box>
        <Box sx={{ display: "flex", gap: "0.5rem" }}>
          <MRT_ToggleFiltersButton table={table} />
          <Button
            color="primary"
            onClick={handleOpenDialog}
            variant="contained"
          >
            Create Buyer
          </Button>
        </Box>
      </Box>
    </Box>
  );

  return (
    <div>
      <h1>Buyers</h1>
      <BuyerDialog
        open={isDialogOpen}
        onClose={(isUpdated) => handleCloseDialog(isUpdated)}
        editData={editData}
        isEditing={isEditing}
        title={isEditing ? "Edit Buyer" : "Create Buyer"}
        width="sm"
      />
      <div className="mt-4">
        <GenericTable
          data={buyers}
          columns={columns}
          renderRowActionMenuItems={renderRowActionMenuItems}
          renderTopToolbar={renderTopToolbar}
        />
      </div>
    </div>
  );
};

export default Buyer;
