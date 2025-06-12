import React from 'react';

function Content({ customer, setCustomer }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
                <label className="block text-gray-700 text-sm mb-1">Customer Name</label>
                <input
                  type="text"
                  className="w-full border border-gray-200 rounded px-2 py-1 bg-gray-50 text-gray-800"
                  placeholder="Name"
                  value={customer.name}
                  onChange={e => setCustomer({ ...customer, name: e.target.value })}
                />
            </div>
            <div>
                <label className="block text-gray-700 text-sm mb-1">Mobile No</label>
                <input
                  type="text"
                  className="w-full border border-gray-200 rounded px-2 py-1 bg-gray-50 text-gray-800"
                  placeholder="Mobile"
                  value={customer.mobile}
                  onChange={e => setCustomer({ ...customer, mobile: e.target.value })}
                />
            </div>
            <div>
                <label className="block text-gray-700 text-sm mb-1">Date</label>
                <input
                  type="date"
                  className="w-full border border-gray-200 rounded px-2 py-1 bg-gray-50 text-gray-800"
                  value={customer.date}
                  onChange={e => setCustomer({ ...customer, date: e.target.value })}
                />
            </div>
            <div>
                <label className="block text-gray-700 text-sm mb-1">GST No</label>
                <input
                  type="text"
                  className="w-full border border-gray-200 rounded px-2 py-1 bg-gray-50 text-gray-800"
                  placeholder="GST"
                  value={customer.gst}
                  onChange={e => setCustomer({ ...customer, gst: e.target.value })}
                />
            </div>
            <div className="md:col-span-2">
                <label className="block text-gray-700 text-sm mb-1">Email</label>
                <input
                  type="email"
                  className="w-full border border-gray-200 rounded px-2 py-1 bg-gray-50 text-gray-800"
                  placeholder="Email"
                  value={customer.email}
                  onChange={e => setCustomer({ ...customer, email: e.target.value })}
                />
            </div>
        </div>
    );
}

export default Content;