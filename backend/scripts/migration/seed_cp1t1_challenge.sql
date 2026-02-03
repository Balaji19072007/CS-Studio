-- Seed challenge for the specific topic user is testing (c-p1-t1)
INSERT INTO course_challenges (course_id, topic_id, topic_name, title, description, input_format, output_format, hints, reference_output)
SELECT 'c-programming', 'c-p1-t1', 'Introduction to C', 'First Steps', 'Write a program that prints "Hello, World!" to the console.', 'None', 'Hello, World!', 'Use printf function', 'Hello, World!'
WHERE NOT EXISTS (SELECT 1 FROM course_challenges WHERE topic_id = 'c-p1-t1');
