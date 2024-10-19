import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import numberToWords from "number-to-words";
import { getProducts } from "../services/masterProductServices/masterProductServices";
import { getSellers } from "../services/sellerServices/SellerServices";
import { getBuyers } from "../services/buyerServices/buyerServices";

const Invoice = () => {
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [customRate, setCustomRate] = useState(0);
  const [selectedBuyer, setSelectedBuyer] = useState(null);
  const [buyers, setBuyers] = useState([]);
  const [products, setProducts] = useState([]);
  const [seller, setSeller] = useState(null);
  const [invoiceNumber, setInvoiceNumber] = useState("INV-001");
  const [date, setDate] = useState(dayjs().format("DD/MM/YYYY"));
  const [errorMessage, setErrorMessage] = useState("");
  const [vehicleNumber, setVehicleNumber] = useState(""); // Vehicle Number State
  const [ewayBill, setEwayBill] = useState(""); // E-Way Bill State
  const [isEditing, setIsEditing] = useState(false); // New state to track if editing is in progress

  useEffect(() => {
    fetchBuyers();
    fetchSellers();
    getProductsfromapi();
  }, []);

  const fetchBuyers = async () => {
    try {
      const fetchedBuyers = await getBuyers();
      setBuyers(fetchedBuyers?.buyers);
    } catch (error) {
      console.error("Error fetching buyers:", error);
      setErrorMessage("Failed to load buyers.");
    }
  };

  const getProductsfromapi = async () => {
    try {
      const response = await getProducts();
      const updatedProducts = response?.products?.map((product) => ({
        id: product._id,
        ProductName: product.description,
        HSNCode: product.hsn,
        rate: product.rate,
      }));
      setProducts(updatedProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
      setErrorMessage("Failed to load products.");
    }
  };

  const fetchSellers = async () => {
    try {
      const fetchedSellers = await getSellers();
      setSeller(fetchedSellers[0]?.name);
    } catch (error) {
      console.error("Error fetching sellers:", error);
      setErrorMessage("Failed to load sellers.");
    }
  };

  const handleBuyerChange = (e) => {
    const selectedBuyerId = e.target.value;
    const selected = buyers.find((buyer) => buyer._id === selectedBuyerId);
    setSelectedBuyer(selected);
  };

  const handleAddProduct = () => {
    // Validate quantity and custom rate
    const parsedQuantity = parseInt(quantity);
    const parsedCustomRate = parseFloat(customRate);

    if (!selectedProduct) {
      setErrorMessage("Please select a product.");
      return;
    }
    if (parsedQuantity <= 0) {
      setErrorMessage("Quantity must be greater than zero.");
      return;
    }
    if (parsedCustomRate <= 0) {
      setErrorMessage("Custom rate must be greater than zero.");
      return;
    }

    // Check for duplicate product
    const isDuplicate = selectedProducts.some(
      (product) => product.id === selectedProduct.id
    );
    if (isDuplicate && !isEditing) {
      setErrorMessage("This product is already added.");
      return;
    }

    // Clear error message if validation passes
    setErrorMessage("");

    const newProduct = {
      ...selectedProduct,
      rate: parsedCustomRate,
      quantity: parsedQuantity,
    };

    if (isEditing) {
      // Update the existing product if in editing mode
      const updatedProducts = selectedProducts.map((product) =>
        product.id === selectedProduct.id ? newProduct : product
      );
      setSelectedProducts(updatedProducts);
      setIsEditing(false); // Reset editing mode
    } else {
      setSelectedProducts([...selectedProducts, newProduct]);
    }

    // Reset input fields
    setSelectedProduct(null);
    setQuantity(1);
    setCustomRate(0);
  };

  const handleEditProduct = (index) => {
    const productToEdit = selectedProducts[index];
    setSelectedProduct(productToEdit);
    setQuantity(productToEdit.quantity);
    setCustomRate(productToEdit.rate);
    setIsEditing(true); // Set editing state to true
  };

  const handleDeleteProduct = (productId) => {
    const updatedProducts = selectedProducts.filter((p) => p.id !== productId);
    setSelectedProducts(updatedProducts);
  };

  // Function to print the invoice
  const handlePrint = () => {
    const printContent = document.getElementById("printableInvoice").innerHTML;
    const printWindow = window.open("", "", "height=600,width=800");

    printWindow.document.write(`
      <html>
        <head>
          <title>Print Invoice</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              margin: 0;
              padding: 20px;
            }
            /* Add more styles as needed */
            table {
              width: 100%;
              border-collapse: collapse;
            }
            th, td {
              border: 1px solid #ddd;
              padding: 8px;
              text-align: left;
            }
            th {
              background-color: #f2f2f2;
            }
          </style>
        </head>
        <body>
          ${printContent}
        </body>
      </html>
    `);

    printWindow.document.close();
    printWindow.print();
  };

  // Updated tax calculations
  const taxableValue = selectedProducts
    .reduce((acc, item) => acc + (item.quantity * item.rate || 0), 0)
    .toFixed(2);
  const cgst = (taxableValue * 0.025).toFixed(2);
  const sgst = (taxableValue * 0.025).toFixed(2);
  const igst =
    selectedBuyer?.outsideTN === "Yes"
      ? (taxableValue * 0.05).toFixed(2)
      : "0.00";
  const totalTax =
    selectedBuyer?.outsideTN === "Yes"
      ? igst
      : (parseFloat(cgst) + parseFloat(sgst)).toFixed(2);
  const grandTotal = (parseFloat(taxableValue) + parseFloat(totalTax)).toFixed(
    2
  );
  // const totalInWords =
  //   grandTotal && !isNaN(grandTotal)
  //     ? numberToWords.toWords(Math.round(grandTotal)) + " rupees only"
  //     : "Zero rupees only";

  // Custom function to convert number to words in Indian format
  const numberToWords = (num) => {
    const a = [
      "",
      "one",
      "two",
      "three",
      "four",
      "five",
      "six",
      "seven",
      "eight",
      "nine",
    ];
    const b = [
      "",
      "ten",
      "twenty",
      "thirty",
      "forty",
      "fifty",
      "sixty",
      "seventy",
      "eighty",
      "ninety",
    ];
    const c = ["", "hundred", "thousand", "lakh", "crore"];

    const digits = String(num).split("");
    const words = [];

    const length = digits.length;
    if (length > 9) return "too much"; // Limiting to 9 digits for simplicity

    digits.reverse();

    // Process lakhs
    if (length > 5) {
      words.push(a[+digits[5]] + " lakh");
    }

    // Process thousands
    if (length > 4) {
      words.push(a[+digits[4]] + " thousand");
    }

    // Process hundreds
    if (length > 3) {
      words.push(a[+digits[3]] + " hundred");
    }

    // Process tens and units
    const lastTwoDigits = length >= 3 ? num % 100 : num;
    if (lastTwoDigits < 20) {
      if (lastTwoDigits < 10) {
        words.push(a[lastTwoDigits]);
      } else {
        const tenUnit = lastTwoDigits - 10;
        words.push(b[tenUnit]);
      }
    } else {
      const tenDigit = Math.floor(lastTwoDigits / 10);
      const unitDigit = lastTwoDigits % 10;
      words.push(b[tenDigit]);
      if (unitDigit > 0) {
        words.push(a[unitDigit]);
      }
    }

    const result = words.filter(Boolean).join(" ").trim() + " rupees only";
    return result
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const totalInWords =
    grandTotal && !isNaN(grandTotal)
      ? numberToWords(Math.round(grandTotal))
      : "Zero rupees only";

  return (
    <div>
      <div
        className="p-5 font-sans max-w-5xl mx-auto border rounded-lg shadow-lg bg-white invoice"
        id="printableInvoice"
      >
        {/* Header section */}
        <div className="text-center mb-5">
          <h1 className="text-3xl font-bold text-gray-800">INVOICE</h1>
          <h2 className="text-xl text-gray-700">Muthurasu Minerals</h2>
          <p className="text-sm text-gray-500">
            S.F-NO-337/1A, D.NO-2/363, Madhavakurich Village, Rastha,
            Tirunelveli-627201, Tamil Nadu, India.
          </p>
          <p className="text-sm text-gray-500">GST IN: 33AAWFM3428Q1ZI</p>
        </div>

        {/* Error Message */}
        {errorMessage && (
          <div className="mb-4 p-2 bg-red-100 text-red-800 border border-red-300 rounded">
            {errorMessage}
          </div>
        )}

        {/* Seller and Buyer Details */}
        <div className="flex justify-between mb-5 text-gray-700">
          <div className="w-1/2 pr-5">
            <h4 className="font-semibold mb-2">Seller</h4>
            <p>{seller || "Select Seller"}</p>
          </div>
          <div className="w-1/2 text-right">
            <p>
              <strong>Invoice Date:</strong> {date}
            </p>
            <p>
              <strong>Invoice No:</strong> {invoiceNumber}
            </p>
          </div>
        </div>

        {/* Buyer Selection */}
        <div className="mb-5">
          <label className="block mb-2" htmlFor="buyer">
            Buyer
          </label>
          <select
            id="buyer"
            className="border p-2 rounded w-full"
            onChange={handleBuyerChange}
            value={selectedBuyer ? selectedBuyer._id : ""}
          >
            <option value="">Select Buyer</option>
            {buyers.map((buyer) => (
              <option key={buyer._id} value={buyer._id}>
                {buyer.name}
              </option>
            ))}
          </select>
        </div>

        {/* Product Selection */}
        <div className="flex mb-5">
          <div className="w-1/2 pr-2">
            <label className="block mb-2" htmlFor="product">
              Product
            </label>
            <select
              id="product"
              className="border p-2 rounded w-full"
              onChange={(e) =>
                setSelectedProduct(
                  products.find((p) => p.id === e.target.value)
                )
              }
              value={selectedProduct ? selectedProduct.id : ""}
            >
              <option value="">Select Product</option>
              {products.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.ProductName}
                </option>
              ))}
            </select>
          </div>
          <div className="w-1/2 pl-2">
            <label className="block mb-2" htmlFor="quantity">
              Quantity
            </label>
            <input
              type="number"
              id="quantity"
              className="border p-2 rounded w-full"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>
        </div>

        {/* Custom Rate */}
        <div className="mb-5">
          <label className="block mb-2" htmlFor="customRate">
            Custom Rate
          </label>
          <input
            type="number"
            id="customRate"
            className="border p-2 rounded w-full"
            value={customRate}
            onChange={(e) => setCustomRate(e.target.value)}
          />
        </div>

        {/* Add Product Button */}
        <button
          onClick={handleAddProduct}
          className={`bg-blue-500 text-white py-2 px-4 rounded ${
            isEditing ? "bg-green-500" : ""
          }`}
        >
          {isEditing ? "Update Product" : "Add Product"}
        </button>

        {/* Products Table */}
        <table className="min-w-full mt-5 border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">Product</th>
              <th className="border px-4 py-2">Quantity</th>
              <th className="border px-4 py-2">Rate</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {selectedProducts.map((product, index) => (
              <tr key={index} className="border-b">
                <td className="border px-4 py-2">{product.ProductName}</td>
                <td className="border px-4 py-2">{product.quantity}</td>
                <td className="border px-4 py-2">{product.rate}</td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => handleEditProduct(index)}
                    className="text-blue-500 hover:underline mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteProduct(product.id)}
                    className="text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Total Section */}
        <div className="mt-5 text-gray-700">
          <h3 className="font-semibold">Summary</h3>
          <p>
            <strong>Taxable Value:</strong> ₹{taxableValue}
          </p>
          <p>
            <strong>CGST:</strong> ₹{cgst}
          </p>
          <p>
            <strong>SGST:</strong> ₹{sgst}
          </p>
          <p>
            <strong>IGST:</strong> ₹{igst}
          </p>
          <p>
            <strong>Total Tax:</strong> ₹{totalTax}
          </p>
          <p>
            <strong>Grand Total:</strong> ₹{grandTotal}
          </p>
          <p>
            <strong>Amount in Words:</strong> {totalInWords}
          </p>
        </div>

        {/* Vehicle Number and E-Way Bill */}
        <div className="mb-5">
          <label className="block mb-2" htmlFor="vehicleNumber">
            Vehicle Number
          </label>
          <input
            type="text"
            id="vehicleNumber"
            className="border p-2 rounded w-full"
            value={vehicleNumber}
            onChange={(e) => setVehicleNumber(e.target.value)}
          />
        </div>

        <div className="mb-5">
          <label className="block mb-2" htmlFor="ewayBill">
            E-Way Bill
          </label>
          <input
            type="text"
            id="ewayBill"
            className="border p-2 rounded w-full"
            value={ewayBill}
            onChange={(e) => setEwayBill(e.target.value)}
          />
        </div>
      </div>

      {/* Print Button */}
      <button
        onClick={handlePrint}
        className="bg-blue-500 text-white py-2 px-4 rounded mt-5"
      >
        Print Invoice
      </button>
    </div>
  );
};

export default Invoice;
