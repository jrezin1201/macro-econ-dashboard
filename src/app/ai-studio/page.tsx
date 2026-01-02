/**
 * AI Studio Showcase
 *
 * Demonstrates AI chat interface, prompt library, token counter, and conversation history
 */

"use client";

import { useState } from "react";
import {
  AIChatInterface,
  PromptLibrary,
  TokenCounter,
  ConversationHistory,
  type PromptTemplate,
  type Conversation,
} from "@/modules/ai-studio";
import { Card } from "@/components/ui/Card";

// Pre-calculate timestamps outside component to avoid impure Date.now() calls
const ONE_HOUR_AGO = Date.now() - 3600000;
const TWO_HOURS_AGO = Date.now() - 7200000;
const ONE_DAY_AGO = Date.now() - 86400000;

export default function AIStudioPage() {
  const [selectedPrompt, setSelectedPrompt] = useState<string>("");
  const [sampleText, setSampleText] = useState(
    "Hello! This is a sample text to demonstrate the token counter. You can type or paste any text here to see an estimate of how many tokens it would use with different AI models."
  );

  // Sample prompt templates
  const promptTemplates: PromptTemplate[] = [
    {
      id: "1",
      title: "Code Review Assistant",
      description:
        "Reviews code for best practices, potential bugs, and improvements",
      category: "Coding",
      prompt:
        "You are an expert code reviewer. Please review the following code:\n\n{code}\n\nProvide feedback on:\n1. Code quality and best practices\n2. Potential bugs or issues\n3. Performance optimizations\n4. Readability improvements",
      variables: ["code"],
    },
    {
      id: "2",
      title: "Blog Post Writer",
      description: "Creates engaging blog posts on any topic",
      category: "Writing",
      prompt:
        "Write a comprehensive blog post about {topic}. The post should:\n- Be approximately {word_count} words\n- Include an engaging introduction\n- Have 3-5 main sections with clear headings\n- Include practical examples\n- End with a strong conclusion and call-to-action",
      variables: ["topic", "word_count"],
    },
    {
      id: "3",
      title: "Data Analysis Expert",
      description: "Analyzes data and provides insights",
      category: "Analysis",
      prompt:
        "You are a data analysis expert. Please analyze the following data:\n\n{data}\n\nProvide insights on:\n1. Key trends and patterns\n2. Statistical significance\n3. Actionable recommendations\n4. Potential areas for further investigation",
      variables: ["data"],
    },
    {
      id: "4",
      title: "Creative Storyteller",
      description: "Generates creative stories based on prompts",
      category: "Creative",
      prompt:
        "Write a creative story with the following elements:\n- Setting: {setting}\n- Main character: {character}\n- Conflict: {conflict}\n- Tone: {tone}\n\nMake it engaging and vivid, with strong imagery and character development.",
      variables: ["setting", "character", "conflict", "tone"],
    },
    {
      id: "5",
      title: "Business Email Generator",
      description: "Crafts professional business emails",
      category: "Business",
      prompt:
        "Write a professional business email for the following purpose:\n\nRecipient: {recipient}\nPurpose: {purpose}\nKey points to include: {key_points}\nTone: {tone}\n\nEnsure the email is concise, professional, and includes an appropriate greeting and sign-off.",
      variables: ["recipient", "purpose", "key_points", "tone"],
    },
    {
      id: "6",
      title: "Technical Documentation",
      description: "Creates clear technical documentation",
      category: "Writing",
      prompt:
        "Create technical documentation for {feature_name}. Include:\n\n1. Overview and purpose\n2. Prerequisites\n3. Step-by-step instructions\n4. Code examples with explanations\n5. Common troubleshooting tips\n6. Best practices\n\nMake it clear and accessible for developers with varying experience levels.",
      variables: ["feature_name"],
    },
  ];

  // Sample conversation history
  const sampleConversations: Conversation[] = [
    {
      id: "1",
      title: "Code Review: React Component",
      messageCount: 12,
      lastMessage: "Thanks! That really helps with the performance optimization.",
      timestamp: new Date(ONE_HOUR_AGO),
      model: "GPT-4",
    },
    {
      id: "2",
      title: "Blog Post: AI in Healthcare",
      messageCount: 8,
      lastMessage: "Perfect! Can you add a section about ethics?",
      timestamp: new Date(TWO_HOURS_AGO),
      model: "Claude 3",
    },
    {
      id: "3",
      title: "Data Analysis: Sales Trends",
      messageCount: 15,
      lastMessage: "These insights are exactly what I needed for the presentation.",
      timestamp: new Date(ONE_DAY_AGO),
      model: "GPT-4",
    },
  ];

  const handleTemplateSelect = (template: PromptTemplate) => {
    setSelectedPrompt(template.prompt);
    console.log("Selected template:", template.title);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 p-6">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">AI Studio</h1>
          <p className="text-xl text-white/60">
            Streaming chat, prompt templates, token counting, and conversation
            management
          </p>
        </div>

        {/* Main Chat Section */}
        <section>
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-white mb-2">
              AI Chat Interface
            </h2>
            <p className="text-white/60">
              Interactive chat with AI models (demo mode - no API required)
            </p>
          </div>
          <AIChatInterface
            placeholder="Ask me anything..."
            systemPrompt={
              selectedPrompt ||
              "You are a helpful AI assistant. Provide clear, accurate, and helpful responses."
            }
          />
        </section>

        {/* Divider */}
        <div className="border-t border-white/10"></div>

        {/* Prompt Library & Token Counter */}
        <section className="grid lg:grid-cols-3 gap-6">
          {/* Prompt Library - 2 columns */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-white mb-2">
                Prompt Library
              </h2>
              <p className="text-white/60">
                Pre-built templates for common AI tasks
              </p>
            </div>
            <PromptLibrary
              templates={promptTemplates}
              onSelectTemplate={handleTemplateSelect}
            />
          </div>

          {/* Token Counter - 1 column */}
          <div>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-white mb-2">
                Token Counter
              </h2>
              <p className="text-white/60">Estimate token usage in real-time</p>
            </div>
            <div className="space-y-4">
              <TokenCounter text={sampleText} model="gpt-4" />
              <Card>
                <div className="p-4">
                  <label className="block text-sm font-medium text-white mb-2">
                    Try Your Own Text
                  </label>
                  <textarea
                    value={sampleText}
                    onChange={(e) => setSampleText(e.target.value)}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                    rows={8}
                    placeholder="Type or paste text here..."
                  />
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="border-t border-white/10"></div>

        {/* Conversation History */}
        <section>
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-white mb-2">
              Conversation History
            </h2>
            <p className="text-white/60">
              Manage and revisit past AI conversations
            </p>
          </div>
          <ConversationHistory
            conversations={sampleConversations}
            onSelectConversation={(id) =>
              console.log("Selected conversation:", id)
            }
            onDeleteConversation={(id) =>
              console.log("Deleted conversation:", id)
            }
            onNewConversation={() => console.log("Starting new conversation")}
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
                {/* AI Chat Interface */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">
                    AI Chat Interface
                  </h3>
                  <p className="text-sm text-white/60 mb-4">
                    Full-featured chat interface with message history, streaming
                    support, and keyboard shortcuts.
                  </p>
                  <div className="bg-black/40 p-4 rounded-lg">
                    <code className="text-xs text-green-400">
{`import { AIChatInterface } from "@/modules/ai-studio";

<AIChatInterface
  onSendMessage={async (msg) => {...}}
  systemPrompt="Your custom prompt"
  placeholder="Ask me anything..."
/>`}
                    </code>
                  </div>
                </div>

                {/* Prompt Library */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">
                    Prompt Library
                  </h3>
                  <p className="text-sm text-white/60 mb-4">
                    Searchable template library with categories and variable
                    placeholders.
                  </p>
                  <div className="bg-black/40 p-4 rounded-lg">
                    <code className="text-xs text-green-400">
{`import { PromptLibrary } from "@/modules/ai-studio";

<PromptLibrary
  templates={templates}
  onSelectTemplate={(template) => {...}}
/>`}
                    </code>
                  </div>
                </div>

                {/* Token Counter */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">
                    Token Counter
                  </h3>
                  <p className="text-sm text-white/60 mb-4">
                    Real-time token estimation with model-specific limits and
                    warnings.
                  </p>
                  <div className="bg-black/40 p-4 rounded-lg">
                    <code className="text-xs text-green-400">
{`import { TokenCounter } from "@/modules/ai-studio";

<TokenCounter
  text={inputText}
  model="gpt-4"
  onChange={(count) => {...}}
/>`}
                    </code>
                  </div>
                </div>

                {/* Conversation History */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">
                    Conversation History
                  </h3>
                  <p className="text-sm text-white/60 mb-4">
                    Manage past conversations with search, delete, and restore
                    functionality.
                  </p>
                  <div className="bg-black/40 p-4 rounded-lg">
                    <code className="text-xs text-green-400">
{`import { ConversationHistory } from "@/modules/ai-studio";

<ConversationHistory
  conversations={conversations}
  onSelectConversation={(id) => {...}}
  onDeleteConversation={(id) => {...}}
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
