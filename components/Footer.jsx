import React from 'react';

function Footer({ onSave, onDownloadPDF, onSendEmail, onPreview }) {
  return (
    <div className="flex flex-wrap gap-3 justify-end mt-4" data-html2pdf-ignore>
      
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition flex items-center justify-center"
        onClick={onSave}
        type="button"
        title="Save"
        data-htm12canvas-ignore
      >
       <img className='w-8 h-8' src="/assets/exl.png" alt="" />
      </button>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition flex items-center justify-center"
        title="download"
        onClick={onDownloadPDF}
        type="button"
        data-htm12canvas-ignore
      >
        <img className='w-8 h-8' src="/assets/download-pdf.png" alt=""/>
      </button>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition flex items-center justify-center"
        onClick={onPreview}
        type="button"
        title="Preview"
        data-htm12canvas-ignore>
        <img className='w-8 h-8' src="/assets/file.png" alt=""/>
        </button>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition flex items-center justify-center"
        onClick={onSendEmail}
        type="button"
        title="Send Email"
        data-htm12canvas-ignore>
        <img className='w-8 h-8' src="/assets/gmail.png" alt=""/>
        </button>
        <button
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition flex items-center justify-center"
        title="WhatsApp"
      >
        <img className='w-8 h-8' src="/assets\whatsapp_png.png" alt="" />
      </button>
      
    </div>
  );
}

export default Footer;