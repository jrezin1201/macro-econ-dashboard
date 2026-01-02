/**
 * Community Hub Showcase
 *
 * Demonstrates member directory and comment system
 */

"use client";

import { useState } from "react";
import {
  MemberDirectory,
  CommentSystem,
  type Member,
  type Comment,
} from "@/modules/community";
import { Card } from "@/components/ui/Card";

// Pre-calculate timestamps outside component to avoid impure Date.now() calls during render
const TWO_HOURS_AGO = Date.now() - 3600000 * 2;
const ONE_HOUR_AGO = Date.now() - 3600000;
const THIRTY_MIN_AGO = Date.now() - 1800000;
const FIFTEEN_MIN_AGO = Date.now() - 900000;
const ONE_DAY_AGO = Date.now() - 86400000;

export default function CommunityPage() {
  // Sample members data
  const [members] = useState<Member[]>([
    {
      id: "1",
      name: "Sarah Johnson",
      role: "Developer",
      bio: "Full-stack developer passionate about building great user experiences.",
      joinedDate: new Date("2024-01-15"),
      tags: ["React", "TypeScript", "Node.js"],
      location: "San Francisco, CA",
      isOnline: true,
    },
    {
      id: "2",
      name: "Michael Chen",
      role: "Designer",
      bio: "UI/UX designer focused on creating intuitive and beautiful interfaces.",
      joinedDate: new Date("2024-02-20"),
      tags: ["UI/UX", "Figma", "Design Systems"],
      location: "New York, NY",
      isOnline: false,
    },
    {
      id: "3",
      name: "Emily Rodriguez",
      role: "Developer",
      bio: "Backend engineer specializing in scalable systems and APIs.",
      joinedDate: new Date("2024-03-10"),
      tags: ["Python", "PostgreSQL", "AWS"],
      location: "Austin, TX",
      isOnline: true,
    },
    {
      id: "4",
      name: "David Kim",
      role: "Product Manager",
      bio: "Product leader helping teams build solutions that users love.",
      joinedDate: new Date("2023-12-05"),
      tags: ["Product Strategy", "Agile", "User Research"],
      location: "Seattle, WA",
      isOnline: false,
    },
    {
      id: "5",
      name: "Jessica Taylor",
      role: "Developer",
      bio: "Mobile developer creating native iOS and Android experiences.",
      joinedDate: new Date("2024-04-01"),
      tags: ["React Native", "Swift", "Kotlin"],
      location: "Los Angeles, CA",
      isOnline: true,
    },
    {
      id: "6",
      name: "Alex Martinez",
      role: "Designer",
      bio: "Creative director with a passion for branding and visual identity.",
      joinedDate: new Date("2024-01-28"),
      tags: ["Branding", "Illustration", "Motion Design"],
      location: "Miami, FL",
      isOnline: false,
    },
  ]);

  // Sample comments data
  const [comments, setComments] = useState<Comment[]>([
    {
      id: "c1",
      author: "Sarah Johnson",
      content:
        "This is an amazing platform! I've learned so much from the community here. The courses are well-structured and the support is fantastic.",
      timestamp: new Date(TWO_HOURS_AGO),
      likes: 12,
      isLiked: false,
      replies: [
        {
          id: "c1-r1",
          author: "Michael Chen",
          content:
            "I completely agree! The quality of content here is top-notch.",
          timestamp: new Date(ONE_HOUR_AGO),
          likes: 5,
          isLiked: true,
        },
        {
          id: "c1-r2",
          author: "Emily Rodriguez",
          content:
            "Same here! I especially love the hands-on projects and real-world examples.",
          timestamp: new Date(THIRTY_MIN_AGO),
          likes: 3,
          isLiked: false,
          replies: [
            {
              id: "c1-r2-r1",
              author: "David Kim",
              content:
                "The practical approach really helps with retention. Great point!",
              timestamp: new Date(FIFTEEN_MIN_AGO),
              likes: 2,
              isLiked: false,
            },
          ],
        },
      ],
    },
    {
      id: "c2",
      author: "Jessica Taylor",
      content:
        "Does anyone have recommendations for advanced TypeScript courses? Looking to level up my skills.",
      timestamp: new Date(TWO_HOURS_AGO),
      likes: 8,
      isLiked: false,
      replies: [
        {
          id: "c2-r1",
          author: "Alex Martinez",
          content:
            "Check out the TypeScript Deep Dive course in the Advanced section. It's excellent!",
          timestamp: new Date(ONE_HOUR_AGO),
          likes: 4,
          isLiked: false,
        },
      ],
    },
    {
      id: "c3",
      author: "David Kim",
      content:
        "Just completed the Product Management fundamentals course. Highly recommend it to anyone interested in PM!",
      timestamp: new Date(ONE_DAY_AGO),
      likes: 15,
      isLiked: true,
    },
  ]);

  const handleCommentAdd = (content: string, parentId?: string) => {
    const newComment: Comment = {
      id: `c${Date.now()}`,
      author: "You",
      content,
      timestamp: new Date(),
      likes: 0,
      isLiked: false,
    };

    if (parentId) {
      // Add as reply (simplified - in production would need recursive update)
      console.log("Adding reply to:", parentId);
    } else {
      setComments((prev) => [newComment, ...prev]);
    }
  };

  const handleCommentLike = (commentId: string) => {
    console.log("Liked comment:", commentId);
    // In production, update the likes count and isLiked status
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 p-6">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Community Hub</h1>
          <p className="text-xl text-white/60">
            Connect with members and join the conversation
          </p>
        </div>

        {/* Member Directory Section */}
        <section>
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-white mb-2">
              Member Directory
            </h2>
            <p className="text-white/60">
              Browse and connect with community members
            </p>
          </div>
          <MemberDirectory
            members={members}
            onMemberSelect={(member) =>
              console.log("Selected member:", member.name)
            }
          />
        </section>

        {/* Divider */}
        <div className="border-t border-white/10"></div>

        {/* Comment System Section */}
        <section>
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-white mb-2">
              Discussion Thread
            </h2>
            <p className="text-white/60">
              Nested comments with threading support
            </p>
          </div>
          <CommentSystem
            comments={comments}
            onCommentAdd={handleCommentAdd}
            onCommentLike={handleCommentLike}
            maxDepth={3}
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
                {/* Member Directory */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">
                    Member Directory
                  </h3>
                  <p className="text-sm text-white/60 mb-4">
                    Searchable member directory with role filtering, tag
                    filtering, and grid/list view modes.
                  </p>
                  <div className="bg-black/40 p-4 rounded-lg">
                    <code className="text-xs text-green-400">
{`import { MemberDirectory } from "@/modules/community";

<MemberDirectory
  members={members}
  onMemberSelect={(member) => {}}
/>`}
                    </code>
                  </div>
                </div>

                {/* Comment System */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">
                    Comment System
                  </h3>
                  <p className="text-sm text-white/60 mb-4">
                    Nested comment system with threading, likes, replies, and
                    sorting options.
                  </p>
                  <div className="bg-black/40 p-4 rounded-lg">
                    <code className="text-xs text-green-400">
{`import { CommentSystem } from "@/modules/community";

<CommentSystem
  comments={comments}
  onCommentAdd={(content, parentId) => {}}
  onCommentLike={(commentId) => {}}
  maxDepth={3}
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
