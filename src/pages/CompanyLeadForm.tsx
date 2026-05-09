import React, { useState } from "react";
import { createCompanyLead } from "@/services/companyLead.service";
import { validateLead } from "@/api/validators";
import { CompanyLeadPayload, CompanySize } from "@/type/companyLead.types";

const COMPANY_SIZES: CompanySize[] = ["1-25", "26-50", "51-100", "100+"];

const CompanyLeadForm = () => {
    const [form, setForm] = useState<CompanyLeadPayload>({
        name: "",
        email: "",
        phoneNumber: "",
        whatsappNumber: "",
        companyName: "",
        companySize: "1-25",
        address: "",
        tags: [],
        source: "manual",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleCompanySize = (size: CompanySize) => {
        setForm({ ...form, companySize: size });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const validationError = validateLead(form);
        if (validationError) {
            setError(validationError);
            return;
        }

        try {
            setLoading(true);
            setError("");

            await createCompanyLead(form);

            alert("Lead Created Successfully");

            setForm({
                name: "",
                email: "",
                phoneNumber: "",
                whatsappNumber: "",
                companyName: "",
                companySize: "1-25",
                address: "",
                tags: [],
                source: "manual",
            });

        } catch (err: any) {
            setError(err?.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-2 px-3  sm:py-8 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                {/* Header Section */}
                <div className="text-center mb-6 sm:mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl sm:rounded-3xl shadow-lg mb-4">
                        <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                    </div>
                    <div className="mb-6">
                        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                            Attendance Inquiry
                        </h1>

                        <p className="text-gray-500 mt-2 text-sm sm:text-base">
                            Search, filter, and analyze employee attendance records in real-time
                        </p>
                    </div>
                </div>

                {/* Form Card */}
                <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl overflow-hidden border border-gray-100">
                    {/* Error Alert */}
                    {error && (
                        <div className="mx-4 sm:mx-6 mt-4 sm:mt-6 p-3 sm:p-4 bg-red-50 border-l-4 border-red-500 rounded-lg animate-shake">
                            <div className="flex items-center">
                                <svg className="w-5 h-5 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <p className="text-red-600 text-sm sm:text-base">{error}</p>
                            </div>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="p-4 sm:p-6 lg:p-8 space-y-5 sm:space-y-6">
                        {/* Name Field */}
                        <div className="group">
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Full Name <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                </div>
                                <input
                                    name="name"
                                    placeholder="John Doe"
                                    value={form.name}
                                    onChange={handleChange}
                                    className="w-full pl-10 pr-4 py-2.5 sm:py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none text-sm sm:text-base"
                                />
                            </div>
                        </div>

                        {/* Email Field */}
                        <div className="group">
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Email Address <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <input
                                    name="email"
                                    type="email"
                                    placeholder="john@example.com"
                                    value={form.email}
                                    onChange={handleChange}
                                    className="w-full pl-10 pr-4 py-2.5 sm:py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none text-sm sm:text-base"
                                />
                            </div>
                        </div>

                        {/* Phone Number Field */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                            <div className="group">
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Phone Number <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                        </svg>
                                    </div>
                                    <input
                                        name="phoneNumber"
                                        placeholder="+1 234 567 8900"
                                        value={form.phoneNumber}
                                        onChange={handleChange}
                                        className="w-full pl-10 pr-4 py-2.5 sm:py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none text-sm sm:text-base"
                                    />
                                </div>
                            </div>

                            {/* WhatsApp Number Field */}
                            <div className="group">
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    WhatsApp Number
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                        </svg>
                                    </div>
                                    <input
                                        name="whatsappNumber"
                                        placeholder="+1 234 567 8900"
                                        value={form.whatsappNumber}
                                        onChange={handleChange}
                                        className="w-full pl-10 pr-4 py-2.5 sm:py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none text-sm sm:text-base"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Company Name Field */}
                        <div className="group">
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Company Name <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                    </svg>
                                </div>
                                <input
                                    name="companyName"
                                    placeholder="Tech Corp Inc."
                                    value={form.companyName}
                                    onChange={handleChange}
                                    className="w-full pl-10 pr-4 py-2.5 sm:py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none text-sm sm:text-base"
                                />
                            </div>
                        </div>

                        {/* Company Size Buttons */}
                        <div className="group">
                            <label className="block text-sm font-semibold text-gray-700 mb-3">
                                Company Size <span className="text-red-500">*</span>
                            </label>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
                                {COMPANY_SIZES.map((size) => (
                                    <button
                                        type="button"
                                        key={size}
                                        onClick={() => handleCompanySize(size)}
                                        className={`px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl font-medium transition-all duration-200 transform hover:scale-105 ${form.companySize === size
                                                ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/30"
                                                : "bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200"
                                            }`}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Address Field */}
                        <div className="group">
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Address
                            </label>
                            <div className="relative">
                                <div className="absolute top-3 left-0 pl-3 pointer-events-none">
                                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </div>
                                <input
                                    name="address"
                                    placeholder="123 Business St, Suite 100, City, Country"
                                    value={form.address}
                                    onChange={handleChange}
                                    className="w-full pl-10 pr-4 py-2.5 sm:py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none text-sm sm:text-base"
                                />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 sm:py-4 rounded-xl font-semibold text-base sm:text-lg transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/30 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center space-x-2"
                        >
                            {loading ? (
                                <>
                                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    <span>Creating Lead...</span>
                                </>
                            ) : (
                                <>
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span>Create Lead</span>
                                </>
                            )}
                        </button>

                        {/* Form Footer */}
                        <p className="text-center text-xs text-gray-400 pt-4">
                            By creating a lead, you agree to our{' '}
                            <a href="#" className="text-blue-600 hover:underline">Terms of Service</a> and{' '}
                            <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>
                        </p>
                    </form>
                </div>
            </div>

            {/* Add custom animation keyframes */}
            <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        .animate-shake {
          animation: shake 0.3s ease-in-out;
        }
      `}</style>
        </div>
    );
};

export default CompanyLeadForm;