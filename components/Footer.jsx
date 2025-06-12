import React from 'react';

function Footer({ onSave, onDownloadPDF, onSendEmail, onPreview }) {
  return (
    <div className="flex flex-wrap gap-2 justify-end mt-4" data-html2pdf-ignore>
      <button
        className="border border-gray-300 text-gray-700 px-3 py-1 rounded hover:bg-gray-100 transition flex items-center justify-center"
        onClick={onSave}
        type="button"
        title="Save"
        data-htm12canvas-ignore
      >
        <img className='w-6 h-6' src="/assets/exl.png" alt="Excel" />
      </button>
      <button
        className="border border-gray-300 text-gray-700 px-3 py-1 rounded hover:bg-gray-100 transition flex items-center justify-center"
        title="Download PDF"
        onClick={onDownloadPDF}
        type="button"
        data-htm12canvas-ignore
      >
        <img className='w-6 h-6' src="/assets/download-pdf.png" alt="PDF" />
      </button>
      <button
        className="border border-gray-300 text-gray-700 px-3 py-1 rounded hover:bg-gray-100 transition flex items-center justify-center"
        onClick={onPreview}
        type="button"
        title="Preview"
        data-htm12canvas-ignore
      >
        <img className='w-6 h-6' src="/assets/file.png" alt="Preview" />
      </button>
      <button
        className="border border-gray-300 text-gray-700 px-3 py-1 rounded hover:bg-gray-100 transition flex items-center justify-center"
        onClick={onSendEmail}
        type="button"
        title="Send Email"
        data-htm12canvas-ignore
      >
        <img className='w-6 h-6' src="/assets/gmail.png" alt="Email" />
      </button>
      <button
        className="border border-gray-300 text-gray-700 px-3 py-1 rounded hover:bg-gray-100 transition flex items-center justify-center"
        title="WhatsApp"
      >
        <img className='w-6 h-6' src="/assets/whatsapp_png.png" alt="WhatsApp" />
      </button>
    </div>
  );
}

export default Footer;