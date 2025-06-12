
import React, { useState, useRef } from 'react';
import * as XLSX from 'xlsx';
import html2pdf from 'html2pdf.js';
import { Routes, Route, useNavigate } from 'react-router-dom';


import Header from '../components/Header';
import Content from '../components/Content';
import Product from '../components/Product';
import Footer from '../components/Footer';
import Preview from '../components/Preview';
import LandingPg from '../components/LandingPg';

function MainApp() {
  const [customer, setCustomer] = useState({
    name: '',
    mobile: '',
    date: '',
    gst: '',
    email: ''
  });
const handleSendEmail = async () => {
  if (!customer.email) {
    alert('Please enter a customer email.');
    return;
  }

  const SERVICE_ID = 'service_3esjxgz';
  const TEMPLATE_ID = 'template_d9a3a8o';
  const PUBLIC_KEY = '51k-cK8nZvKKQLDy4';

  const formData = new FormData();
  formData.append('to_email', customer.email);
  formData.append('name', customer.name);
  formData.append('message', 'Thank you for your purchase!'); 
  formData.append('service_id', SERVICE_ID);
  formData.append('template_id', TEMPLATE_ID);
  formData.append('user_id', PUBLIC_KEY);

  fetch('https://api.emailjs.com/api/v1.0/email/send-form', {
    method: 'POST',
    body: formData,
    headers: {
      'origin': window.location.origin,
    },
  })
    .then(response => {
      if (response.ok) {
        alert('Email sent!');
      } else {
        alert('Failed to send email.');
      }
    })
    .catch(() => alert('Failed to send email.'));
};
  const productRef = useRef();
  const navigate = useNavigate();

  const handleDownloadPDF = async () => {
    var element = document.getElementById('invoice-content');
    var opt = {
      margin: 1,
      filename: 'invoice.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 1 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    html2pdf().from(element).set(opt).save();
  };
  
  const handleDownloadExcel = () => {
    const products = productRef.current?.getProducts?.() || [];
    const customerSheet = [
      {
        'Customer Name': customer.name,
        'Mobile No': customer.mobile,
        'Date': customer.date,
        'GST No': customer.gst,
        'Email': customer.email,
      }
    ];
    const productSheet = products.map((p, idx) => ({
      'S.No': idx + 1,
      'Product Name': p.name,
      'Available Qty': p.availableQty,
      'Price': p.price,
      'Buy Qty': p.buyQty,
      'GST %': p.gst,
      'Discount %': p.discount,
      'Total': p.total,
    }));
    const wb = XLSX.utils.book_new();
    const wsCustomer = XLSX.utils.json_to_sheet(customerSheet);
    const wsProduct = XLSX.utils.json_to_sheet(productSheet);
    XLSX.utils.book_append_sheet(wb, wsCustomer, 'Customer');
    XLSX.utils.book_append_sheet(wb, wsProduct, 'Products');
    XLSX.writeFile(wb, 'invoice.xlsx');
  };

  const handlePreview = () => {
    const products = productRef.current?.getProducts?.() || [];
    navigate('/preview', { state: { customer, products } });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-8">
      <div id="invoice-content" className="bg-white rounded-lg shadow-md w-full max-w-2xl p-8">
        <Header />
        <Content customer={customer} setCustomer={setCustomer}/>
        <Product ref={productRef} />
        <Footer onSave={handleDownloadExcel} onDownloadPDF={handleDownloadPDF} onPreview={handlePreview} onSendEmail={handleSendEmail}/>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPg />} />
      <Route path="/app" element={<MainApp />} />
      <Route path="/preview" element={<Preview />} />
    </Routes>
  );
}