import React, { useState, useEffect } from "react";
import { X, Upload, CheckCircle2, AlertCircle, FileText, Send, Briefcase } from 'lucide-react';

interface JobApplicationModelProps {
    isOpen: boolean;
    onClose: () => void;
    defaultJobrole?: string;
    allJobs?: Array<{ role: string; dept?: string }>;
    recipientEmail?: string;
    ccEmail?: string;
}
export const JobApplicationModel: React.FC<JobApplicationModelProps> = ({ isOpen, onClose, defaultJobrole, allJobs = [], recipientEmail, ccEmail }) => {
    const [formData, setFormData] = useState({
        fullname: '',
        email: '',
        phone: '',
        role: defaultJobrole || '',
        gender: '',
        qualification: '',
        education: '',
        experience: '',
        currentCompany: '',
        currentCtc: '',
        expectedCtc: '',
        noticePeriod: '',
        willingToRelocate: '', // Willing to shift to Siddipet
        disability: 'No',      // Disability
        address: ''
    });
    const [resumefile, setResumeFile] = useState<File | null>(null);
    const [resumebase64, setresumebase64] = useState<string>('');
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [errorMsg, setErrormsg] = useState<string>('');
    // Prevent background scrolling when modal is open
    useEffect(() => {
        if (isOpen) {
            const originalOverflow = document.body.style.overflow;
            document.body.style.overflow = 'hidden';
            return () => {
                document.body.style.overflow = originalOverflow;
            };
        }
    }, [isOpen]);

    useEffect(() => {
        if (isOpen) {
            setFormData(prev => ({
                ...prev,
                role: defaultJobrole || (allJobs[0]?.role || 'General Application')
            }));
            setIsSuccess(false);
            setErrormsg('');
            setResumeFile(null);
            setresumebase64('');
        }
    }, [isOpen, defaultJobrole]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // 1. Size Validation (5 MB limit = 5 * 1024 * 1024 bytes)
        if (file.size > 5 * 1024 * 1024) {
            setErrormsg('Resume file size must be less than 5MB.');
            return;
        }

        setErrormsg('');
        setResumeFile(file);

        // 2. Convert file to Base64 string
        const reader = new FileReader();
        reader.onload = () => {
            setresumebase64(reader.result as string);
        };
        reader.readAsDataURL(file);
    };
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); // Stop standard browser page refresh

        // 1. Required fields check
        if (!formData.fullname || !formData.email || !formData.phone) {
            setErrormsg('Please fill in all required fields (Name, Email, Phone).');
            return;
        }

        if (!resumefile) {
            setErrormsg('Please attach your resume file (PDF, DOC, or DOCX) before submitting.');
            return;
        }

        setIsSubmitting(true);
        setErrormsg('');

        try {
            // 2. Save a backup to localStorage for the Admin/HR dashboard
            const existing = JSON.parse(localStorage.getItem('dxn_job_applications') || '[]');
            const newApp = {
                id: Date.now(),
                ...formData,
                resumeFileName: resumefile?.name || 'No file attached',
                resumeData: resumebase64 || null,
                appliedDate: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
            };
            localStorage.setItem('dxn_job_applications', JSON.stringify([newApp, ...existing]));

            // 3. Send automated background email directly to dxn15553@gmail.com (no Gmail redirect)
            const fd = new FormData();
            fd.append('_subject', `New Job Application: ${formData.role} - ${formData.fullname}`);
            fd.append('_template', 'table');
            fd.append('_captcha', 'false');
            fd.append('_replyto', formData.email);

            fd.append('Applicant Name', formData.fullname);
            fd.append('Email Address', formData.email);
            fd.append('Phone Number', formData.phone);
            fd.append('Position Applied', formData.role);
            fd.append('Gender', formData.gender || 'Not specified');
            fd.append('Qualification', formData.qualification || 'Not specified');
            fd.append('Education / College', formData.education || 'Not specified');
            fd.append('Total Experience', formData.experience || 'Not specified');
            fd.append('Current Company', formData.currentCompany || 'Not specified');
            fd.append('Current CTC', formData.currentCtc || 'Not specified');
            fd.append('Expected CTC', formData.expectedCtc || 'Not specified');
            fd.append('Notice Period', formData.noticePeriod || 'Not specified');
            fd.append('Willing to Relocate (Siddipet)', formData.willingToRelocate || 'Not specified');
            fd.append('Disability', formData.disability || 'No');
            fd.append('Current Address', formData.address || 'Not specified');

            if (resumefile) {
                fd.append('attachment', resumefile, resumefile.name);
            }
            // Dynamic HR recipient routing
            const targetEmail = recipientEmail?.trim() || 'dxn15553@gmail.com';
            const endpoint = targetEmail.toLowerCase() === 'dxn15553@gmail.com'
                ? 'https://formsubmit.co/aef4a0b6dc64e6b968a7eb2799b667d2'
                : `https://formsubmit.co/${encodeURIComponent(targetEmail)}`;

            if (ccEmail?.trim()) {
                fd.append('_cc', ccEmail.trim());
            }

            // Perform background delivery
            try {
                await fetch(endpoint, {
                    method: 'POST',
                    body: fd,
                });
            } catch (mailErr) {
                console.warn('Background mailer warning:', mailErr);
            }

            // 4. Show success screen (without opening Gmail or leaving the website)
            setIsSuccess(true);
        } catch (error) {
            setErrormsg('Something went wrong while submitting. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };
    if (!isOpen) return null;

    return (
        <div
            onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
            className="fixed inset-0 z-[9999] flex justify-center items-start p-3 sm:p-4 md:p-6 bg-black/85 backdrop-blur-md overflow-y-auto overscroll-contain cursor-pointer"
        >
            <div onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-4xl bg-white border border-neutral-200 rounded-xl shadow-2xl p-6 md:p-10 text-neutral-900 my-6 sm:my-10 animate-in fade-in zoom-in-95 duration-200 cursor-default">
                {/* Back Button */}
                <button
                    onClick={onClose}
                    type="button"
                    className="absolute top-5 right-5 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-neutral-600 hover:text-neutral-900 bg-neutral-100 hover:bg-neutral-200 border border-neutral-200 px-3.5 py-2 rounded-md transition-colors shadow-sm"
                    aria-label="Back to Careers"
                >
                    <X className="w-4 h-4" />
                    <span>Back</span>
                </button>

                {isSuccess ? (
                    /* Success Screen */
                    <div className="text-center py-8 space-y-4">
                        <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto border border-emerald-200">
                            <CheckCircle2 className="w-10 h-10" />
                        </div>
                        <h3 className="text-2xl font-bold uppercase tracking-tight text-neutral-900">Application Submitted!</h3>
                        <p className="text-neutral-600 text-sm max-w-md mx-auto leading-relaxed">
                            Thank you, <span className="text-neutral-900 font-semibold">{formData.fullname}</span>. Your application for <span className="text-red-600 font-semibold">{formData.role}</span> has been received by DXN Human Resources. Our recruitment team will review your profile and reach out shortly.
                        </p>
                        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                            <button
                                onClick={onClose}
                                className="px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-bold uppercase tracking-wider text-xs transition-colors rounded-sm shadow-sm"
                            >
                                Done
                            </button>
                        </div>
                    </div>
                ) : (
                    /* Application Form */
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="border-b border-neutral-200 pb-4">
                            <div className="flex items-center gap-2 text-red-600 text-xs font-bold uppercase tracking-widest mb-1">
                                <Briefcase className="w-4 h-4" />
                                <span>Career Application</span>
                            </div>
                            <h2 className="text-2xl font-bold tracking-tight text-neutral-900">Apply for Position</h2>
                        </div>

                        {errorMsg && (
                            <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-sm">
                                <AlertCircle className="w-4 h-4 shrink-0" />
                                <span>{errorMsg}</span>
                            </div>
                        )}

                        {/* Position Selection */}
                        <div>
                            <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-700 mb-2">
                                Position Applied For *
                            </label>
                            <select
                                value={formData.role}
                                onChange={e => setFormData({ ...formData, role: e.target.value })}
                                className="w-full bg-neutral-50 border border-neutral-300 text-neutral-900 px-4 py-3 text-sm rounded-md focus:bg-white focus:border-red-600 focus:ring-1 focus:ring-red-600 outline-none transition-all"
                            >
                                {allJobs.map((j, idx) => (
                                    <option key={idx} value={j.role}>
                                        {j.role} {j.dept ? `(${j.dept})` : ''}
                                    </option>
                                ))}
                                <option value="General Application">General Application</option>
                            </select>
                        </div>

                        {/* 1. Name & Email */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-700 mb-2">Full Name *</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="e.g. Rahul Sharma"
                                    value={formData.fullname}
                                    onChange={e => setFormData({ ...formData, fullname: e.target.value })}
                                    className="w-full bg-neutral-50 border border-neutral-300 text-neutral-900 px-4 py-2.5 text-sm rounded-md focus:bg-white focus:border-red-600 focus:ring-1 focus:ring-red-600 outline-none transition-all placeholder:text-neutral-400"
                                />
                            </div>
                            <div>
                                <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-700 mb-2">Email Address *</label>
                                <input
                                    type="email"
                                    required
                                    placeholder="rahul@example.com"
                                    value={formData.email}
                                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full bg-neutral-50 border border-neutral-300 text-neutral-900 px-4 py-2.5 text-sm rounded-md focus:bg-white focus:border-red-600 focus:ring-1 focus:ring-red-600 outline-none transition-all placeholder:text-neutral-400"
                                />
                            </div>
                        </div>

                        {/* 2. Phone & Gender */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-700 mb-2">Phone Number *</label>
                                <input
                                    type="tel"
                                    required
                                    placeholder="+91 98765 43210"
                                    value={formData.phone}
                                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                    className="w-full bg-neutral-50 border border-neutral-300 text-neutral-900 px-4 py-2.5 text-sm rounded-md focus:bg-white focus:border-red-600 focus:ring-1 focus:ring-red-600 outline-none transition-all placeholder:text-neutral-400"
                                />
                            </div>
                            <div>
                                <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-700 mb-2">Gender *</label>
                                <select
                                    required
                                    value={formData.gender}
                                    onChange={e => setFormData({ ...formData, gender: e.target.value })}
                                    className="w-full bg-neutral-50 border border-neutral-300 text-neutral-900 px-4 py-2.5 text-sm rounded-md focus:bg-white focus:border-red-600 focus:ring-1 focus:ring-red-600 outline-none transition-all"
                                >
                                    <option value="" disabled>Select Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                    <option value="Prefer not to say">Prefer not to say</option>
                                </select>
                            </div>
                        </div>

                        {/* 3. Qualification & Education */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-700 mb-2">Qualification *</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="e.g. B.Tech / Diploma / M.Sc / ITI"
                                    value={formData.qualification}
                                    onChange={e => setFormData({ ...formData, qualification: e.target.value })}
                                    className="w-full bg-neutral-50 border border-neutral-300 text-neutral-900 px-4 py-2.5 text-sm rounded-md focus:bg-white focus:border-red-600 focus:ring-1 focus:ring-red-600 outline-none transition-all placeholder:text-neutral-400"
                                />
                            </div>
                            <div>
                                <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-700 mb-2">Education / College</label>
                                <input
                                    type="text"
                                    placeholder="e.g. Mechanical Engineering / JNTU"
                                    value={formData.education}
                                    onChange={e => setFormData({ ...formData, education: e.target.value })}
                                    className="w-full bg-neutral-50 border border-neutral-300 text-neutral-900 px-4 py-2.5 text-sm rounded-md focus:bg-white focus:border-red-600 focus:ring-1 focus:ring-red-600 outline-none transition-all placeholder:text-neutral-400"
                                />
                            </div>
                        </div>

                        {/* 4. Experience & Current Company */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-700 mb-2">Total Experience *</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="e.g. 6+ Years"
                                    value={formData.experience}
                                    onChange={e => setFormData({ ...formData, experience: e.target.value })}
                                    className="w-full bg-neutral-50 border border-neutral-300 text-neutral-900 px-4 py-2.5 text-sm rounded-md focus:bg-white focus:border-red-600 focus:ring-1 focus:ring-red-600 outline-none transition-all placeholder:text-neutral-400"
                                />
                            </div>
                            <div>
                                <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-700 mb-2">Current Company</label>
                                <input
                                    type="text"
                                    placeholder="e.g. ABC Pharma / Manufacturing Ltd"
                                    value={formData.currentCompany}
                                    onChange={e => setFormData({ ...formData, currentCompany: e.target.value })}
                                    className="w-full bg-neutral-50 border border-neutral-300 text-neutral-900 px-4 py-2.5 text-sm rounded-md focus:bg-white focus:border-red-600 focus:ring-1 focus:ring-red-600 outline-none transition-all placeholder:text-neutral-400"
                                />
                            </div>
                        </div>

                        {/* 5. Current CTC, Expected CTC & Notice Period */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-700 mb-2">Current CTC</label>
                                <input
                                    type="text"
                                    placeholder="e.g. 6.5 LPA"
                                    value={formData.currentCtc}
                                    onChange={e => setFormData({ ...formData, currentCtc: e.target.value })}
                                    className="w-full bg-neutral-50 border border-neutral-300 text-neutral-900 px-4 py-2.5 text-sm rounded-md focus:bg-white focus:border-red-600 focus:ring-1 focus:ring-red-600 outline-none transition-all placeholder:text-neutral-400"
                                />
                            </div>
                            <div>
                                <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-700 mb-2">Expected CTC *</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="e.g. 8.5 LPA"
                                    value={formData.expectedCtc}
                                    onChange={e => setFormData({ ...formData, expectedCtc: e.target.value })}
                                    className="w-full bg-neutral-50 border border-neutral-300 text-neutral-900 px-4 py-2.5 text-sm rounded-md focus:bg-white focus:border-red-600 focus:ring-1 focus:ring-red-600 outline-none transition-all placeholder:text-neutral-400"
                                />
                            </div>
                            <div>
                                <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-700 mb-2">Notice Period *</label>
                                <select
                                    required
                                    value={formData.noticePeriod}
                                    onChange={e => setFormData({ ...formData, noticePeriod: e.target.value })}
                                    className="w-full bg-neutral-50 border border-neutral-300 text-neutral-900 px-4 py-2.5 text-sm rounded-md focus:bg-white focus:border-red-600 focus:ring-1 focus:ring-red-600 outline-none transition-all"
                                >
                                    <option value="" disabled>Select Notice</option>
                                    <option value="Immediate">Immediate</option>
                                    <option value="15 Days">15 Days</option>
                                    <option value="30 Days">30 Days</option>
                                    <option value="60 Days">60 Days</option>
                                    <option value="90 Days">90 Days</option>
                                </select>
                            </div>
                        </div>

                        {/* 6. Willing to Shift to Siddipet & Disability */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-700 mb-2">
                                    Willing to shift to Siddipet? *
                                </label>
                                <select
                                    required
                                    value={formData.willingToRelocate}
                                    onChange={e => setFormData({ ...formData, willingToRelocate: e.target.value })}
                                    className="w-full bg-neutral-50 border border-neutral-300 text-neutral-900 px-4 py-2.5 text-sm rounded-md focus:bg-white focus:border-red-600 focus:ring-1 focus:ring-red-600 outline-none transition-all"
                                >
                                    <option value="" disabled>Select Option</option>
                                    <option value="Yes">Yes, willing to relocate</option>
                                    <option value="Already living in Siddipet">Already living in Siddipet</option>
                                    <option value="No">No</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-700 mb-2">Disability</label>
                                <select
                                    value={formData.disability}
                                    onChange={e => setFormData({ ...formData, disability: e.target.value })}
                                    className="w-full bg-neutral-50 border border-neutral-300 text-neutral-900 px-4 py-2.5 text-sm rounded-md focus:bg-white focus:border-red-600 focus:ring-1 focus:ring-red-600 outline-none transition-all"
                                >
                                    <option value="No">No</option>
                                    <option value="Yes">Yes</option>
                                </select>
                            </div>
                        </div>

                        {/* 7. Address */}
                        <div>
                            <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-700 mb-2">Current Address / Location *</label>
                            <textarea
                                required
                                rows={2}
                                placeholder="Enter your current residential address or city..."
                                value={formData.address}
                                onChange={e => setFormData({ ...formData, address: e.target.value })}
                                className="w-full bg-neutral-50 border border-neutral-300 text-neutral-900 px-4 py-2.5 text-sm rounded-md focus:bg-white focus:border-red-600 focus:ring-1 focus:ring-red-600 outline-none resize-none transition-all placeholder:text-neutral-400"
                            />
                        </div>


                        {/* Resume File Upload Box */}
                        <div>
                            <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-700 mb-2">
                                Upload Resume (PDF / DOC / DOCX - Max 5MB) *
                            </label>
                            <div className="border-2 border-dashed border-neutral-300 hover:border-red-600 rounded-md p-4 text-center cursor-pointer transition-colors relative bg-neutral-50 hover:bg-red-50/20">
                                <input
                                    type="file"
                                    accept=".pdf,.doc,.docx"
                                    onChange={handleFileChange}
                                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                                />
                                {resumefile ? (
                                    <div className="flex items-center justify-center gap-2 text-emerald-600 text-sm font-semibold">
                                        <FileText className="w-5 h-5 text-emerald-600" />
                                        <span>{resumefile.name}</span>
                                        <span className="text-neutral-500 text-xs font-normal">({(resumefile.size / 1024).toFixed(0)} KB)</span>
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center gap-1 text-neutral-600">
                                        <Upload className="w-6 h-6 text-neutral-500 mb-1" />
                                        <span className="text-xs font-semibold text-neutral-800">Click to browse or drag & drop</span>
                                        <span className="text-[10px] text-neutral-500">Supported formats: PDF, DOC, DOCX (Max 5MB)</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Action Buttons: Cancel + Submit */}
                        <div className="pt-2 flex flex-col-reverse sm:flex-row items-center gap-3">
                            <button
                                type="button"
                                onClick={onClose}
                                className="w-full sm:w-1/3 py-4 px-6 border border-neutral-300 hover:bg-neutral-100 text-neutral-700 font-bold uppercase tracking-wider text-xs transition-colors rounded-sm text-center"
                            >
                                Cancel / Go Back
                            </button>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full sm:w-2/3 bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white py-4 font-bold uppercase tracking-wider text-xs transition-colors flex items-center justify-center gap-2 rounded-sm shadow-sm"
                            >
                                <Send className="w-4 h-4" />
                                <span>{isSubmitting ? 'Submitting Application...' : 'Submit Application to HR'}</span>
                            </button>
                        </div>
                        <p className="text-[11px] text-neutral-500 text-center mt-2">
                            Application will be routed directly to DXN India Human Resources Department.
                        </p>
                    </form>
                )}
            </div>
        </div>
    );
};
