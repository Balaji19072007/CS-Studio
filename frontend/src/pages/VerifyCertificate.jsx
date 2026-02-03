import React, { useState } from 'react';
import Loader from '../components/common/Loader';

const VerifyCertificate = () => {
    const [certificateId, setCertificateId] = useState('');
    const [verificationResult, setVerificationResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleVerify = async (e) => {
        e.preventDefault();

        if (!certificateId.trim()) {
            setError('Please enter a certificate ID');
            return;
        }

        setLoading(true);
        setError(null);
        setVerificationResult(null);

        try {
            const response = await fetch(`/api/certificates/verify/${certificateId.trim()}`);
            const data = await response.json();

            if (response.ok && data.status === 'valid') {
                setVerificationResult(data);
            } else {
                setError('Certificate not found or invalid');
            }
        } catch (err) {
            setError('Error verifying certificate. Please try again.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-white mb-4">Verify Certificate</h1>
                    <p className="text-gray-400 text-lg">
                        Enter a certificate ID to verify its authenticity
                    </p>
                </div>

                <div className="bg-gray-800 rounded-lg border border-gray-700 p-8">
                    <form onSubmit={handleVerify} className="space-y-6">
                        <div>
                            <label htmlFor="certificateId" className="block text-sm font-medium text-gray-300 mb-2">
                                Certificate ID
                            </label>
                            <input
                                type="text"
                                id="certificateId"
                                value={certificateId}
                                onChange={(e) => setCertificateId(e.target.value)}
                                placeholder="CERT-c-programming-user123-20260131"
                                className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary-500 transition"
                            />
                        </div>

                        {error && (
                            <div className="bg-red-900/20 border border-red-500 text-red-200 px-4 py-3 rounded">
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Verifying...' : 'Verify Certificate'}
                        </button>
                    </form>

                    {loading && (
                        <div className="mt-8 text-center">
                            <Loader size="md" message="Verifying certificate..." />
                        </div>
                    )}

                    {verificationResult && (
                        <div className="mt-8">
                            <div className="bg-green-900/20 border border-green-500 rounded-lg p-6">
                                <div className="flex items-center mb-4">
                                    <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mr-4">
                                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-green-400">Valid Certificate</h3>
                                        <p className="text-green-300 text-sm">This certificate is authentic and verified</p>
                                    </div>
                                </div>

                                <div className="space-y-3 border-t border-green-800 pt-4">
                                    <div>
                                        <p className="text-sm text-green-300/70 mb-1">Recipient</p>
                                        <p className="text-lg font-semibold text-white">{verificationResult.userName}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-green-300/70 mb-1">Course</p>
                                        <p className="text-lg font-semibold text-white">{verificationResult.courseTitle}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-green-300/70 mb-1">Issue Date</p>
                                        <p className="text-white">
                                            {verificationResult.issuedAt?.toDate ?
                                                verificationResult.issuedAt.toDate().toLocaleDateString() :
                                                new Date(verificationResult.issuedAt).toLocaleDateString()
                                            }
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-green-300/70 mb-1">Certificate ID</p>
                                        <p className="font-mono text-sm text-white break-all">{verificationResult.certificateId}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <div className="mt-8 text-center text-gray-400 text-sm">
                    <p>CS Studio certificates are issued to learners who successfully complete courses.</p>
                    <p className="mt-2">For questions about verification, contact support@csstudio.app</p>
                </div>
            </div>
        </div>
    );
};

export default VerifyCertificate;
