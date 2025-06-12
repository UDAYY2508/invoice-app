import React, { useState, forwardRef, useImperativeHandle } from 'react';

const Product = forwardRef((props, ref) => {
  const [products, setProducts] = useState([
    { name: '', availableQty: '', price: '', buyQty: '', gst: '', discount: '', total: '' }
  ]);
  const [totals, setTotals] = useState({
    totalAmount: 0,
    discountPercent: 0,
    discountAmount: 0,
    payableAmount: 0,
    paidAmount: 0,
    dueAmount: 0,
  });

  const calculateTotals = (updatedProducts, discountPercent = totals.discountPercent, paidAmount = totals.paidAmount) => {
    const totalAmount = updatedProducts.reduce((sum, p) => sum + (parseFloat(p.total) || 0), 0);
    const discountAmount = (totalAmount * (parseFloat(discountPercent) || 0)) / 100;
    const payableAmount = totalAmount - discountAmount;
    const dueAmount = payableAmount - (parseFloat(paidAmount) || 0);

    setTotals({
      totalAmount,
      discountPercent,
      discountAmount,
      payableAmount,
      paidAmount,
      dueAmount,
    });
  };

  const handleProductChange = (index, field, value) => {
    const updatedProducts = products.map((p, i) =>
      i === index
        ? {
            ...p,
            [field]: value,
            total:
              field === 'buyQty' || field === 'price' || field === 'gst' || field === 'discount'
                ? calculateProductTotal({
                    ...p,
                    [field]: value,
                  })
                : p.total,
          }
        : p
    );
    setProducts(updatedProducts);
    calculateTotals(updatedProducts, totals.discountPercent, totals.paidAmount);
  };

  const calculateProductTotal = (product) => {
    const qty = parseFloat(product.buyQty) || 0;
    const price = parseFloat(product.price) || 0;
    const gst = parseFloat(product.gst) || 0;
    const discount = parseFloat(product.discount) || 0;
    let total = qty * price;
    total += (total * gst) / 100;
    total -= (total * discount) / 100;
    return total.toFixed(2);
  };

  const addProduct = () => {
    setProducts([
      ...products,
      { name: '', availableQty: '', price: '', buyQty: '', gst: '', discount: '', total: '' },
    ]);
  };

  const removeProduct = (index) => {
    const updatedProducts = products.filter((_, i) => i !== index);
    setProducts(updatedProducts.length ? updatedProducts : [
      { name: '', availableQty: '', price: '', buyQty: '', gst: '', discount: '', total: '' }
    ]);
    calculateTotals(updatedProducts.length ? updatedProducts : [
      { name: '', availableQty: '', price: '', buyQty: '', gst: '', discount: '', total: '' }
    ], totals.discountPercent, totals.paidAmount);
  };

  const handleTotalsChange = (field, value) => {
    const updatedTotals = { ...totals, [field]: value };
    if (field === 'discountPercent' || field === 'paidAmount') {
      calculateTotals(products, field === 'discountPercent' ? value : totals.discountPercent, field === 'paidAmount' ? value : totals.paidAmount);
    } else {
      setTotals(updatedTotals);
    }
  };
   useImperativeHandle(ref, () => ({
    getProducts: () => products
  }));

  return (
    <div className="mb-8">
      <h2 className="text-lg font-medium mb-2 text-gray-800">Product Details</h2>
      <div className="hidden md:grid md:grid-cols-9 gap-2 mb-1 font-medium text-gray-600 text-xs">
        <div>Product Name</div>
        <div>Available Qty</div>
        <div>Price</div>
        <div>Buy Qty</div>
        <div>GST %</div>
        <div>Discount %</div>
        <div>Total</div>
        <div className="col-span-2">Action</div>
      </div>
      {products.map((product, idx) => (
        <div key={idx} className="grid grid-cols-1 md:grid-cols-9 gap-2 mb-2 items-end">
          <div>
            <label className="md:hidden block text-xs font-medium text-gray-600 mb-1">Product Name</label>
            <input
              type="text"
              className="border border-gray-200 rounded px-2 py-1 text-sm w-full"
              placeholder="Name"
              value={product.name}
              onChange={e => handleProductChange(idx, 'name', e.target.value)}
            />
          </div>
          <div>
            <label className="md:hidden block text-xs font-medium text-gray-600 mb-1">Available Qty</label>
            <input
              type="number"
              className="border border-gray-200 rounded px-2 py-1 text-sm w-full"
              placeholder="Qty"
              value={product.availableQty}
              onChange={e => handleProductChange(idx, 'availableQty', e.target.value)}
            />
          </div>
          <div>
            <label className="md:hidden block text-xs font-medium text-gray-600 mb-1">Price</label>
            <input
              type="number"
              className="border border-gray-200 rounded px-2 py-1 text-sm w-full"
              placeholder="Price"
              value={product.price}
              onChange={e => handleProductChange(idx, 'price', e.target.value)}
            />
          </div>
          <div>
            <label className="md:hidden block text-xs font-medium text-gray-600 mb-1">Buy Qty</label>
            <input
              type="number"
              className="border border-gray-200 rounded px-2 py-1 text-sm w-full"
              placeholder="Buy"
              value={product.buyQty}
              onChange={e => handleProductChange(idx, 'buyQty', e.target.value)}
            />
          </div>
          <div>
            <label className="md:hidden block text-xs font-medium text-gray-600 mb-1">GST %</label>
            <input
              type="number"
              className="border border-gray-200 rounded px-2 py-1 text-sm w-full"
              placeholder="GST"
              value={product.gst}
              onChange={e => handleProductChange(idx, 'gst', e.target.value)}
            />
          </div>
          <div>
            <label className="md:hidden block text-xs font-medium text-gray-600 mb-1">Discount %</label>
            <input
              type="number"
              className="border border-gray-200 rounded px-2 py-1 text-sm w-full"
              placeholder="Discount"
              value={product.discount}
              onChange={e => handleProductChange(idx, 'discount', e.target.value)}
            />
          </div>
          <div>
            <label className="md:hidden block text-xs font-medium text-gray-600 mb-1" data-html2pdf-ignore>Total</label>
            <input
              type="text"
              className="border border-gray-100 rounded px-2 py-1 text-sm bg-gray-50 w-full"
              placeholder="Total"
              value={product.total}
              readOnly
            />
          </div>
          <div className="flex md:justify-center">
            <button
              className="border border-gray-300 text-gray-600 px-2 py-1.5 rounded text-xs"
              onClick={() => removeProduct(idx)}
              type="button"
              disabled={products.length === 1}
              title={products.length === 1 ? "At least one product required" : "Remove Product"}
            >
              Remove
            </button>
          </div>
        </div>
      ))}
      <button
        className="border border-gray-300 text-gray-700 px-4 py-1 rounded mb-4 hover:bg-gray-100"
        onClick={addProduct}
        type="button"
      >
        Add Product
      </button>
      <div className="border-t pt-4 mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <div className="flex justify-between mb-2">
            <span>Total Amount:</span>
            <span>₹{totals.totalAmount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>Discount (%):</span>
            <input
              type="number"
              className="border border-gray-200 rounded px-2 py-1 w-20 text-sm"
              value={totals.discountPercent}
              onChange={e => handleTotalsChange('discountPercent', e.target.value)}
            />
          </div>
          <div className="flex justify-between mb-2">
            <span>Discount Amount:</span>
            <span>₹{totals.discountAmount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between mb-2 font-medium">
            <span>Payable Amount:</span>
            <span>₹{totals.payableAmount.toFixed(2)}</span>
          </div>
        </div>
        <div>
          <div className="flex justify-between mb-2">
            <span>Paid Amount:</span>
            <input
              type="number"
              className="border border-gray-200 rounded px-2 py-1 w-24 text-sm"
              value={totals.paidAmount}
              onChange={e => handleTotalsChange('paidAmount', e.target.value)}
            />
          </div>
          <div className="flex justify-between mb-2 font-medium">
            <span>Due Amount:</span>
            <span>₹{totals.dueAmount.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
})

export default Product;