/* eslint-disable react/jsx-pascal-case */
import React, { useEffect, useState, useMemo } from "react";
import { Button, Box, MenuItem, lighten } from "@mui/material";
import ProductDialog from "./ProductForm/ProductDialog";
import { deleteProduct, getProducts } from "../services/masterProductServices/masterProductServices";
import dayjs from "dayjs";
import {
  MRT_GlobalFilterTextField,
  MRT_ToggleFiltersButton,
} from "material-react-table";
import GenericTable from "../../common/GridTable";
import { showToast } from "../utills/toastConfig";

const Products = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [products, setProducts] = useState([]);
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
      await deleteProduct(id);
      showToast(`Product ${name} deleted successfully`, "success");
      // Optionally, you can call a function to refresh the product list
      getProductsfromapi(); // Refresh data after deletion if you have a function like this
    } catch (error) {
      showToast(`Failed to delete product: ${error.message}`, "error");
    }
  };

  const getProductsfromapi = async () => {
    const response = await getProducts();
    const updatedProducts = response?.products?.map((product) => ({
      ProductName: product.description,
      HSNCode: product.hsn,
      createdAt: dayjs(product.createdAt).format("DD/MM/YYYY"),
    }));
    setProducts(updatedProducts);
  };

  useEffect(() => {
    getProductsfromapi();
  }, []);

  const columns = useMemo(
    () => [
      {
        accessorKey: "ProductName",
        header: "Product Name",
      },
      {
        accessorKey: "HSNCode",
        header: "HSN Code",
      },
      {
        accessorKey: "createdAt",
        header: "Created At",
      },
    ],
    []
  );

  const renderRowActionMenuItems = ({ closeMenu, row, table }) => [
    <MenuItem
      key={0}
      onClick={() => {
        // Edit logic
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

  const renderTopToolbar = ({ table }) => {
    return (
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
              Create Product
            </Button>
          </Box>
        </Box>
      </Box>
    );
  };

  return (
    <div>
      <h1>Products</h1>
      <ProductDialog
        open={isDialogOpen}
        onClose={handleCloseDialog}
        editData={editData}
        isEditing={isEditing}
        title={isEditing ? "Edit Product" : "Create Product"}
        width="sm"
      />

      {/* Table */}
      <div className="mt-4">
        <GenericTable
          data={products}
          columns={columns}
          renderRowActionMenuItems={renderRowActionMenuItems}
          renderTopToolbar={renderTopToolbar}
        />
      </div>
    </div>
  );
};

export default Products;
