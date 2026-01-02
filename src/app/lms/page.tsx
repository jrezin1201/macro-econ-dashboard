/**
 * Learning Platform Showcase
 *
 * Demonstrates course player and quiz components
 */

"use client";

import {
  CoursePlayer,
  QuizComponent,
  type CourseSection,
  type QuizQuestion,
} from "@/modules/lms";
import { Card } from "@/components/ui/Card";

export default function LMSPage() {
  // Sample course data
  const courseSections: CourseSection[] = [
    {
      id: "section-1",
      title: "Getting Started",
      lessons: [
        {
          id: "lesson-1",
          title: "Introduction to the Platform",
          duration: "5:30",
          videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
          description:
            "Learn the basics of navigating the platform and accessing your courses.",
        },
        {
          id: "lesson-2",
          title: "Setting Up Your Profile",
          duration: "8:15",
          videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
          description: "Customize your learning experience by setting up your profile.",
        },
      ],
    },
    {
      id: "section-2",
      title: "Core Concepts",
      lessons: [
        {
          id: "lesson-3",
          title: "Understanding the Framework",
          duration: "12:45",
          videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
          description: "Deep dive into the core concepts and architecture.",
        },
        {
          id: "lesson-4",
          title: "Best Practices",
          duration: "10:20",
          videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
          description: "Learn industry best practices and common patterns.",
        },
        {
          id: "lesson-5",
          title: "Advanced Techniques",
          duration: "15:00",
          videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
          description: "Master advanced techniques to level up your skills.",
        },
      ],
    },
  ];

  // Sample quiz data
  const quizQuestions: QuizQuestion[] = [
    {
      id: "q1",
      question: "What is the primary purpose of this learning platform?",
      options: [
        "Social networking",
        "Online education and skill development",
        "E-commerce",
        "Entertainment",
      ],
      correctAnswer: 1,
      explanation:
        "This platform is designed for online education, helping users develop new skills through structured courses.",
    },
    {
      id: "q2",
      question: "How many lessons are in the 'Core Concepts' section?",
      options: ["2 lessons", "3 lessons", "4 lessons", "5 lessons"],
      correctAnswer: 1,
      explanation: "The Core Concepts section contains 3 lessons covering framework fundamentals, best practices, and advanced techniques.",
    },
    {
      id: "q3",
      question: "What feature allows you to track your learning progress?",
      options: [
        "Social feed",
        "Shopping cart",
        "Progress indicators and completion tracking",
        "Payment gateway",
      ],
      correctAnswer: 2,
      explanation:
        "The platform uses progress indicators and completion tracking to help you monitor your learning journey.",
    },
    {
      id: "q4",
      question: "Which of the following is a benefit of structured online learning?",
      options: [
        "Learn at your own pace",
        "Access from anywhere",
        "Structured curriculum",
        "All of the above",
      ],
      correctAnswer: 3,
      explanation:
        "Online learning platforms offer flexibility, accessibility, and structured content to enhance the learning experience.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 p-6">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">
            Learning Management System
          </h1>
          <p className="text-xl text-white/60">
            Course player, video lessons, and interactive quizzes
          </p>
        </div>

        {/* Course Player Section */}
        <section>
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-white mb-2">Course Player</h2>
            <p className="text-white/60">
              Video player with progress tracking and lesson sidebar
            </p>
          </div>
          <CoursePlayer
            courseTitle="Complete Guide to Modern Development"
            sections={courseSections}
            onLessonComplete={(lessonId) =>
              console.log("Lesson completed:", lessonId)
            }
          />
        </section>

        {/* Divider */}
        <div className="border-t border-white/10"></div>

        {/* Quiz Section */}
        <section>
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-white mb-2">Quiz Component</h2>
            <p className="text-white/60">
              Interactive quiz with scoring, feedback, and review mode
            </p>
          </div>
          <QuizComponent
            title="Course Knowledge Check"
            questions={quizQuestions}
            passingScore={75}
            onComplete={(score, passed) =>
              console.log(`Quiz completed: ${score}% - ${passed ? "PASSED" : "FAILED"}`)
            }
          />
        </section>

        {/* Divider */}
        <div className="border-t border-white/10"></div>

        {/* Documentation */}
        <section>
          <Card>
            <div className="p-8">
              <h2 className="text-2xl font-bold text-white mb-6">
                Component Documentation
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Course Player */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">
                    Course Player
                  </h3>
                  <p className="text-sm text-white/60 mb-4">
                    Video player with course curriculum, progress tracking, and
                    lesson completion.
                  </p>
                  <div className="bg-black/40 p-4 rounded-lg">
                    <code className="text-xs text-green-400">
{`import { CoursePlayer } from "@/modules/lms";

<CoursePlayer
  courseTitle="My Course"
  sections={courseSections}
  onLessonComplete={(id) => {}}
/>`}
                    </code>
                  </div>
                </div>

                {/* Quiz Component */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">
                    Quiz Component
                  </h3>
                  <p className="text-sm text-white/60 mb-4">
                    Interactive quiz with multiple choice questions, scoring,
                    and review mode.
                  </p>
                  <div className="bg-black/40 p-4 rounded-lg">
                    <code className="text-xs text-green-400">
{`import { QuizComponent } from "@/modules/lms";

<QuizComponent
  title="Quiz Title"
  questions={questions}
  passingScore={70}
  onComplete={(score, passed) => {}}
/>`}
                    </code>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </section>
      </div>
    </div>
  );
}
