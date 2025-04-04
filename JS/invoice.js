document.addEventListener("DOMContentLoaded", () => {
  const invoiceDetails = document.getElementById("invoice-details");
  let invoice = JSON.parse(localStorage.getItem("invoice"));
  
  if (!invoice) {
    invoiceDetails.innerHTML = "<p>No invoice available.</p>";
    return;
  }
  
  // Company name (can be changed as needed)
  const companyName = "K-Fragrances";
  
  // Format invoice date
  const invoiceDate = new Date(invoice.date).toLocaleDateString();
  
  // Use the stored invoice number
  const invoiceNumber = invoice.invoiceNumber;
  
  // Retrieve buyer details from the invoice (full user object)
  const buyer = invoice.buyer || {};
  const buyerTRN = buyer.trn || "N/A";
  const buyerName = buyer.firstName ? `${buyer.firstName} ${buyer.lastName}` : "N/A";
  
  // Calculate subtotal (sum of item price * quantity)
  const subtotal = invoice.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  // Calculate overall discount (10% of subtotal)
  const discount = subtotal * 0.10;
  // Calculate tax (6% on the discounted subtotal)
  const tax = (subtotal - discount) * 0.06;
  // Total cost after discount and tax
  const totalCost = (subtotal - discount) + tax;
  
  // Generate HTML table for purchased items
  let itemsHTML = `<table border="1" cellpadding="5" cellspacing="0" class="center">
    <thead>
      <tr>
        <th>Item Name</th>
        <th>Quantity</th>
        <th>Price</th>
        <th>Discount</th>
        <th>Subtotal</th>
      </tr>
    </thead>
    <tbody>`;
  
  invoice.cart.forEach(item => {
    const itemSubTotal = item.price * item.quantity;
    const itemDiscount = itemSubTotal * 0.10; // 10% discount for the item
    itemsHTML += `<tr>
      <td>${item.name}</td>
      <td>${item.quantity}</td>
      <td>$${item.price.toFixed(2)}</td>
      <td>$${itemDiscount.toFixed(2)}</td>
      <td>$${itemSubTotal.toFixed(2)}</td>
    </tr>`;
  });
  
  itemsHTML += `</tbody></table>`;
  
  // Generate the complete invoice HTML
  const invoiceHTML = `
    <h2>${companyName} - Invoice</h2>
    <p><strong>Invoice Number:</strong> ${invoiceNumber}</p>
    <p><strong>Date:</strong> ${invoiceDate}</p><br/>
    <h3>Buyer Information</h3>
    <p><strong>Name:</strong> ${buyerName}</p>
    <p><strong>TRN:</strong> ${buyerTRN}</p><br/>
    <h3>Shipping Information</h3>
    <p><strong>Name:</strong> ${invoice.shippingDetails.name}</p>
    <p><strong>Address:</strong> ${invoice.shippingDetails.address}</p>
    <p><strong>Phone:</strong> ${invoice.shippingDetails.phone}</p><br/>
    <h3>Purchased Items</h3>
    ${itemsHTML}<br/>
    <h3>Summary</h3>
    <p><strong>Subtotal:</strong> $${subtotal.toFixed(2)}</p>
    <p><strong>Discount (10%):</strong> $${discount.toFixed(2)}</p>
    <p><strong>Taxes (6%):</strong> $${tax.toFixed(2)}</p>
    <h3>Total Cost: $${totalCost.toFixed(2)}</h3>
  `;
  
  invoiceDetails.innerHTML = invoiceHTML;
});
