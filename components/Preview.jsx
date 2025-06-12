import React from 'react';
import Header from '../components/Header';
import html2pdf from 'html2pdf.js';
import { useLocation } from 'react-router-dom';

function Preview() {
  const location = useLocation();
  const { customer, products } = location.state || {};

  const handleDownloadPreview = async () => {
    var element = document.getElementById('preview-page');
    var opt = {
      margin: 1,
      filename: 'preview.pdf',
      image: { type: 'png', quality: 100 },
      html2canvas: { scale: 1 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    html2pdf().from(element).set(opt).save();
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-8">
      <div id="preview-page" className="bg-white rounded border border-gray-200 w-full max-w-2xl p-6">
        <Header />
        <div className="mb-6">
          <h2 className="text-lg font-medium mb-2 text-gray-800">Customer Info</h2>
          <div className="text-gray-700 text-sm">Name: {customer?.name}</div>
          <div className="text-gray-700 text-sm">Mobile: {customer?.mobile}</div>
          <div className="text-gray-700 text-sm">Date: {customer?.date}</div>
          <div className="text-gray-700 text-sm">GST: {customer?.gst}</div>
          <div className="text-gray-700 text-sm">Email: {customer?.email}</div>
        </div>
        <div>
          <h2 className="text-lg font-medium mb-2 text-gray-800">Products</h2>
          <table className="w-full border border-gray-200 text-sm">
            <thead>
              <tr>
                <th className="border border-gray-200 px-2 py-1">Name</th>
                <th className="border border-gray-200 px-2 py-1">Qty</th>
                <th className="border border-gray-200 px-2 py-1">Price</th>
                <th className="border border-gray-200 px-2 py-1">Total</th>
              </tr>
            </thead>
            <tbody>
              {products?.map((p, i) => (
                <tr key={i}>
                  <td className="border border-gray-200 px-2 py-1">{p.name}</td>
                  <td className="border border-gray-200 px-2 py-1">{p.buyQty}</td>
                  <td className="border border-gray-200 px-2 py-1">{p.price}</td>
                  <td className="border border-gray-200 px-2 py-1">{p.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button
            className="border border-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-100 transition flex items-center justify-center mt-4"
            onClick={handleDownloadPreview}
            type="button"
            data-htm12canvas-ignore
          >
            Download Preview
          </button>
        </div>
      </div>
    </div>
  );
}

export default Preview;