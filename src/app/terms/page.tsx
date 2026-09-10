import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service & Usage Guidelines (2026)",
  description: "Hirenza terms of service and usage guidelines for the offline-first interview preparation workspace.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-6 py-20">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">Terms of Service</h1>
          <p className="text-xl text-secondary">Last updated: January 2026</p>
        </div>

        <div className="prose prose-invert max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-bold mb-4">Acceptance of Terms</h2>
            <p className="text-secondary leading-relaxed">
              By accessing and using Hirenza, you accept and agree to be bound by the terms and provision of this agreement.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Use License</h2>
            <p className="text-secondary leading-relaxed">
              Permission is granted to temporarily access the materials on Hirenza for personal, non-commercial educational use. This is the grant of a license, not a transfer of title.
            </p>
            <p className="text-secondary leading-relaxed mt-4">
              Under this license you may not:
            </p>
            <ul className="space-y-3 text-secondary mt-4">
              <li>• Modify or copy the materials for commercial purposes</li>
              <li>• Use the materials for any commercial purpose or public display</li>
              <li>• Attempt to reverse engineer any software contained on the website</li>
              <li>• Remove any copyright or proprietary notations from the materials</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Content</h2>
            <p className="text-secondary leading-relaxed">
              Hirenza provides curated links to interview preparation resources. We do not host the actual problems or content on our servers. All problems link to their respective platforms (LeetCode, GeeksforGeeks, DataLemur, etc.) and are subject to their terms of service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Disclaimer</h2>
            <p className="text-secondary leading-relaxed">
              The materials on Hirenza are provided on an &apos;as is&apos; basis. Hirenza makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Limitations</h2>
            <p className="text-secondary leading-relaxed">
              In no event shall Hirenza or its suppliers be liable for any damages arising out of the use or inability to use the materials on the website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Revisions and Errata</h2>
            <p className="text-secondary leading-relaxed">
              The materials appearing on Hirenza could include technical, typographical, or photographic errors. Hirenza does not warrant that any of the materials are accurate, complete or current. Hirenza may make changes to the materials at any time without notice.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Links</h2>
            <p className="text-secondary leading-relaxed">
              Hirenza has not reviewed all of the sites linked to its platform and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by Hirenza.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Modifications</h2>
            <p className="text-secondary leading-relaxed">
              Hirenza may revise these terms of service at any time without notice. By using this website you are agreeing to be bound by the then current version of these terms of service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Governing Law</h2>
            <p className="text-secondary leading-relaxed">
              These terms and conditions are governed by and construed in accordance with applicable laws and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Contact</h2>
            <p className="text-secondary leading-relaxed">
              If you have any questions about these terms, please contact us at{" "}
              <a href="mailto:connectyash82@gmail.com" className="text-purple-1 hover:underline">
                connectyash82@gmail.com
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
