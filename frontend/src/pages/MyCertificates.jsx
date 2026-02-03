import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import Loader from '../components/common/Loader';

const MyCertificates = () => {
    const { user } = useAuth();
    const [certificates, setCertificates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchCertificates();
    }, [user]);

    const fetchCertificates = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('/api/certificates/my-certificates', {
                headers: {
                    'x-auth-token': token
                }
            });

            if (response.ok) {
                const data = await response.json();
                setCertificates(data.certificates || []);
            } else {
                setError('Failed to fetch certificates');
            }
        } catch (err) {
            setError('Error loading certificates');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const copyVerificationLink = (url) => {
        navigator.clipboard.writeText(url);
        alert('Verification link copied!');
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-900">
                <Loader size="lg" message="Loading certificates..." />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-white mb-2">My Certificates</h1>
                    <p className="text-gray-400">View and manage your course completion certificates</p>
                </div>

                {error && (
                    <div className="bg-red-900/20 border border-red-500 text-red-200 px-4 py-3 rounded mb-6">
                        {error}
                    </div>
                )}

                {certificates.length === 0 ? (
                    <div className="bg-gray-800 rounded-lg p-12 text-center">
                        <div className="w-20 h-20 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-10 h-10 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-white mb-2">No Certificates Yet</h3>
                        <p className="text-gray-400 mb-6">Complete a course to earn your first certificate!</p>
                        <a href="/#/courses" className="inline-block px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition">
                            Browse Courses
                        </a>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {certificates.map((cert) => (
                            <div key={cert.certificateId} className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden hover:border-primary-500 transition">
                                <div className="p-6">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex-1">
                                            <h3 className="text-lg font-semibold text-white mb-1">{cert.courseTitle}</h3>
                                            <p className="text-sm text-gray-400">
                                                {cert.issuedAt?.toDate ? cert.issuedAt.toDate().toLocaleDateString() : new Date(cert.issuedAt).toLocaleDateString()}
                                            </p>
                                        </div>
                                        <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs font-medium rounded">
                                            {cert.status || 'Issued'}
                                        </span>
                                    </div>

                                    <div className="mb-4">
                                        <p className="text-xs text-gray-500 mb-1">Certificate ID</p>
                                        <p className="text-sm text-gray-300 font-mono break-all">{cert.certificateId}</p>
                                    </div>

                                    <div className="space-y-2">
                                        {cert.pdfUrl && (
                                            <a
                                                href={cert.pdfUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="block w-full px-4 py-2 bg-primary-500 text-white text-center rounded-lg hover:bg-primary-600 transition text-sm font-medium"
                                            >
                                                Download PDF
                                            </a>
                                        )}
                                        <button
                                            onClick={() => copyVerificationLink(cert.verificationUrl || `${window.location.origin}/#/verify-certificate?id=${cert.certificateId}`)}
                                            className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition text-sm font-medium"
                                        >
                                            Copy Verification Link
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyCertificates;
