const { supabase } = require('../config/supabase');

// --- Helper: Basic Verification ---
const verifyCertificate = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ error: "Certificate ID is required" });
        }

        const { data, error } = await supabase
            .from('certificates')
            .select('*')
            .eq('id', id)
            .single();

        if (error || !data) {
            return res.status(404).json({ status: "invalid", error: "Certificate not found" });
        }

        // Basic data for public verification
        return res.status(200).json({
            status: "valid",
            userId: data.user_id,
            userName: data.user_name,
            courseTitle: data.course_title,
            issuedAt: data.issued_at,
            certificateId: data.id,
            verificationUrl: data.verification_url
        });
    } catch (error) {
        console.error("Verification error:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

// --- Helper: Premium Verification ---
const verifyCertificatePremium = async (req, res) => {
    try {
        const { id, verifiedBy, paymentToken } = req.body;

        if (!id || !verifiedBy || !paymentToken) {
            return res.status(400).json({ error: "Missing required fields (id, verifiedBy, paymentToken)" });
        }

        // 1. Verify Payment (Mock)
        if (paymentToken !== "valid_token") {
            return res.status(402).json({ error: "Payment failed" });
        }

        const { data, error } = await supabase
            .from('certificates')
            .select('*')
            .eq('id', id)
            .single();

        if (error || !data) {
            return res.status(404).json({ status: "invalid", error: "Certificate not found" });
        }

        // 2. Log Verification
        await supabase.from('certificate_verifications').insert([{
            certificate_id: id,
            verified_by: verifiedBy,
            payment_status: "paid",
            verified_at: new Date().toISOString(),
            verification_type: "premium"
        }]);

        // 3. Return Premium Data
        return res.status(200).json({
            status: "valid",
            userName: data.user_name,
            courseTitle: data.course_title,
            issuedAt: data.issued_at,
            certificateId: data.id,
            pdfUrl: data.pdf_url,
            topicsCovered: "All topics in " + data.course_title,
            verificationType: "premium"
        });

    } catch (error) {
        console.error("Premium Verification error:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

const getMyCertificates = async (req, res) => {
    try {
        const userId = req.user?.id;

        if (!userId) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        const { data, error } = await supabase
            .from('certificates')
            .select('*')
            .eq('user_id', userId);

        if (error) throw error;

        return res.status(200).json({ certificates: data || [] });

    } catch (error) {
        console.error("Error fetching certificates:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = {
    verifyCertificate,
    verifyCertificatePremium,
    getMyCertificates
};

