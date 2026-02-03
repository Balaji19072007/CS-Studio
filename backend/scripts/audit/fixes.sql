
-- FIXES.SQL

-- 1. ADD MISSING RLS POLICIES (Public Read Access)
-- Courses
CREATE POLICY "Public courses are viewable by everyone" 
ON "public"."courses" FOR SELECT 
USING (true);

-- Course Phases
CREATE POLICY "Course Phases are viewable by everyone" 
ON "public"."course_phases" FOR SELECT 
USING (true);

-- Course Topics
CREATE POLICY "Course Topics are viewable by everyone" 
ON "public"."course_topics" FOR SELECT 
USING (true);

-- Problems
CREATE POLICY "Problems are viewable by everyone" 
ON "public"."problems" FOR SELECT 
USING (true);

-- 2. INDEXES for Performance
-- Course Hierarchy Filtering
CREATE INDEX IF NOT EXISTS idx_course_phases_course_id ON public.course_phases(course_id);
CREATE INDEX IF NOT EXISTS idx_course_topics_phase_id ON public.course_topics(phase_id);
CREATE INDEX IF NOT EXISTS idx_course_topics_course_id ON public.course_topics(course_id);

-- Leaderboard
CREATE INDEX IF NOT EXISTS idx_users_total_points ON public.users(total_points DESC);

-- Problems Filtering (e.g. by category or difficulty)
CREATE INDEX IF NOT EXISTS idx_problems_category ON public.problems(category);
CREATE INDEX IF NOT EXISTS idx_problems_difficulty ON public.problems(difficulty);

-- Subscription Lookup
CREATE INDEX IF NOT EXISTS idx_subscriptions_user_id ON public.subscriptions(user_id);
