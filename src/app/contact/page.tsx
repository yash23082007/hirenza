import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with the Hirenza team.",
};

import { Mail, MessageSquare } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-6 py-20">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">Contact Us</h1>
          <p className="text-xl text-secondary">We&apos;d love to hear from you</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="card p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-purple-1/10 flex items-center justify-center">
                <Mail size={24} className="text-purple-1" />
              </div>
              <h2 className="text-2xl font-bold">Email</h2>
            </div>
            <p className="text-secondary mb-4">
              For general inquiries, partnerships, or support:
            </p>
            <a
              href="mailto:connectyash82@gmail.com"
              className="text-purple-1 hover:underline font-semibold"
            >
              connectyash82@gmail.com
              
            </a>
          </div>

          <div className="card p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-purple-1/10 flex items-center justify-center">
                <MessageSquare size={24} className="text-purple-1" />
              </div>
              <h2 className="text-2xl font-bold">Community</h2>
            </div>
            <p className="text-secondary mb-4">
              Join our community to discuss interview preparation, share experiences, and get help:
            </p>
            <a
              href="/community"
              className="text-purple-1 hover:underline font-semibold"
            >
              Visit Community →
            </a>
          </div>
        </div>

        <div className="mt-12 card p-6">
          <h2 className="text-2xl font-bold mb-4">Response Time</h2>
          <p className="text-secondary">
            We typically respond to emails within 24-48 hours. For urgent matters, please mention &quot;URGENT&quot; in the subject line.
          </p>
        </div>
      </div>
    </div>
  );
}
