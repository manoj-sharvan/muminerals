import React, { useEffect, useState, useMemo } from "react";
import { Button, Box, MenuItem, lighten } from "@mui/material";
import { deleteSeller, getSellers } from "../services/sellerServices/SellerServices";
import dayjs from "dayjs";
import {
  MRT_GlobalFilterTextField,
  MRT_ToggleFiltersButton,
} from "material-react-table";
import GenericTable from "../../common/GridTable";
import SellerDialog from "./SellerForm/SellerDialog";
import { showToast } from "../utills/toastConfig";

const Seller = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [sellers, setSellers] = useState([]);
  const [editData, setEditData] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const handleDelete = async (id, name) => {
    try {
      await deleteSeller(id);
      showToast(`Seller ${name} deleted successfully`, "success");
      getSellersFromApi();
    } catch (error) {
      showToast(`Failed to delete seller: ${error.message}`, "error");
    }
  };

  const getSellersFromApi = async () => {
    const response = await getSellers();
    const updatedSellers = response?.sellers?.map((seller) => ({
      _id: seller._id,
      Name: seller.name,
      Address: seller.address,
      Contact: seller.contact.join(", "),
      GSTIN: seller.gstin,
      createdAt: dayjs(seller.createdAt).format("DD/MM/YYYY"),
    }));
    setSellers(updatedSellers);
  };

  useEffect(() => {
    getSellersFromApi();
  }, []);

  const columns = useMemo(
    () => [
      { accessorKey: "Name", header: "Seller Name" },
      { accessorKey: "Address", header: "Address" },
      { accessorKey: "Contact", header: "Contact" },
      { accessorKey: "GSTIN", header: "GSTIN" },
      { accessorKey: "createdAt", header: "Created At" },
    ],
    []
  );

  const renderRowActionMenuItems = ({ closeMenu, row, table }) => [
    <MenuItem
      key={0}
      onClick={() => {
        console.log(row.original, "row.original");
        handleOpenDialog();
        setIsEditing(true);
        setEditData(row.original);
        closeMenu();
      }}
    >
      Edit
    </MenuItem>,
    <MenuItem
      key={1}
      onClick={() => {
        if (
          window.confirm(
            `Are you sure you want to delete ${row.original.Name}?`
          )
        ) {
          handleDelete(row.original._id, row.original.Name);
        }
        closeMenu();
      }}
    >
      Delete
    </MenuItem>,
  ];

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
            Create Seller
          </Button>
        </Box>
      </Box>
    </Box>
  );

  return (
    <div>
      <h1>Seller</h1>
      <SellerDialog
        open={isDialogOpen}
        onClose={handleCloseDialog}
        editData={editData}
        isEditing={isEditing}
        apiCall={getSellersFromApi}
        title={isEditing ? "Edit Seller" : "Create Seller"}
        width="sm"
      />

      <div className="mt-4">
        <GenericTable
          data={sellers}
          columns={columns}
          renderRowActionMenuItems={renderRowActionMenuItems}
          renderTopToolbar={renderTopToolbar}
        />
      </div>
    </div>
  );
};

export default Seller;
