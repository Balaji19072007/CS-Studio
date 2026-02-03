const { supabase } = require('../config/supabase');

const PLANS = {
    FREE: 'FREE',
    PRO: 'PRO',
    ENTERPRISE: 'ENTERPRISE'
};

const FEATURES = {
    CERTIFICATES: 'CERTIFICATES',
    PREMIUM_QUIZZES: 'PREMIUM_QUIZZES',
    FULL_COURSES: 'FULL_COURSES',
    API_ACCESS: 'API_ACCESS'
};

const PLAN_FEATURES = {
    [PLANS.FREE]: [],
    [PLANS.PRO]: [FEATURES.CERTIFICATES, FEATURES.PREMIUM_QUIZZES, FEATURES.FULL_COURSES],
    [PLANS.ENTERPRISE]: [FEATURES.CERTIFICATES, FEATURES.PREMIUM_QUIZZES, FEATURES.FULL_COURSES, FEATURES.API_ACCESS]
};

const getUserSubscription = async (userId) => {
    try {
        const { data, error } = await supabase
            .from('subscriptions')
            .select('*')
            .eq('user_id', userId)
            .single();

        if (data && !error) {
            return {
                plan: data.plan,
                active: data.active,
                startedAt: data.started_at,
                expiresAt: data.expires_at
            };
        }

        return {
            plan: PLANS.FREE,
            active: true,
            startedAt: new Date().toISOString(),
            expiresAt: null
        };
    } catch (error) {
        console.error('Error fetching subscription:', error);
        return { plan: PLANS.FREE, active: true };
    }
};

const getMyPlan = async (req, res) => {
    try {
        const userId = req.user?.id;

        if (!userId) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        const subscription = await getUserSubscription(userId);
        return res.status(200).json(subscription);

    } catch (error) {
        console.error('Error in getMyPlan:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

const upgradePlan = async (req, res) => {
    try {
        const userId = req.user?.id;
        const { plan, paymentToken } = req.body;

        if (!userId) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        if (!plan || !Object.values(PLANS).includes(plan)) {
            return res.status(400).json({ error: 'Invalid plan' });
        }

        if (plan !== PLANS.FREE && !paymentToken) {
            return res.status(400).json({ error: 'Payment required' });
        }

        if (paymentToken && paymentToken !== 'valid_token') {
            return res.status(402).json({ error: 'Payment failed' });
        }

        const expiryDate = new Date();
        expiryDate.setFullYear(expiryDate.getFullYear() + 1);

        const subscriptionData = {
            user_id: userId,
            plan: plan,
            active: true,
            started_at: new Date().toISOString(),
            expires_at: plan === PLANS.FREE ? null : expiryDate.toISOString()
        };

        const { error } = await supabase
            .from('subscriptions')
            .upsert(subscriptionData);

        if (error) throw error;

        return res.status(200).json({
            success: true,
            message: `Subscription upgraded to ${plan}`,
            subscription: subscriptionData
        });

    } catch (error) {
        console.error('Error in upgradePlan:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

const checkAccess = async (req, res) => {
    try {
        const userId = req.user?.id;
        const { feature } = req.params;

        if (!userId) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        const subscription = await getUserSubscription(userId);
        const hasAccess = PLAN_FEATURES[subscription.plan]?.includes(feature) || false;

        return res.status(200).json({
            hasAccess,
            plan: subscription.plan,
            feature
        });

    } catch (error) {
        console.error('Error in checkAccess:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    getUserSubscription,
    getMyPlan,
    upgradePlan,
    checkAccess,
    PLANS,
    FEATURES,
    PLAN_FEATURES
};

