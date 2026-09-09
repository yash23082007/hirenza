export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-6 py-20">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">Privacy Policy</h1>
          <p className="text-xl text-secondary">Last updated: January 2026</p>
        </div>

        <div className="prose prose-invert max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-bold mb-4">Overview</h2>
            <p className="text-secondary leading-relaxed">
              At Hirenza, we take your privacy seriously. This privacy policy explains how we collect, use, and protect your personal information when you use our platform.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Information We Collect</h2>
            <p className="text-secondary leading-relaxed mb-4">
              We collect minimal information necessary to provide our service:
            </p>
            <ul className="space-y-3 text-secondary">
              <li className="flex items-start gap-3">
                <span className="text-purple-1 font-bold">→</span>
                <span><strong className="text-primary">Local Storage Data:</strong> Your progress, bookmarks, theme preferences, and completed questions are stored locally in your browser. This data never leaves your device.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-purple-1 font-bold">→</span>
                <span><strong className="text-primary">Analytics:</strong> We may use anonymous analytics to understand how users interact with the platform and improve the experience.</span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">How We Use Your Information</h2>
            <p className="text-secondary leading-relaxed">
              We use the information we collect to:
            </p>
            <ul className="space-y-3 text-secondary mt-4">
              <li>• Provide and maintain our service</li>
              <li>• Track your progress and bookmarks locally</li>
              <li>• Improve the platform based on usage patterns</li>
              <li>• Ensure a personalized experience</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Data Storage</h2>
            <p className="text-secondary leading-relaxed">
              All your progress data is stored locally in your browser using localStorage. We do not store your personal preparation data on our servers. This means your data is private to your device and browser.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Third-Party Services</h2>
            <p className="text-secondary leading-relaxed">
              Hirenza links to external resources like LeetCode, GeeksforGeeks, and DataLemur. When you click these links, you are subject to their respective privacy policies. We do not control third-party websites.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Your Rights</h2>
            <p className="text-secondary leading-relaxed">
              You have the right to:
            </p>
            <ul className="space-y-3 text-secondary mt-4">
              <li>• Clear your local data at any time through your browser settings</li>
              <li>• Use the platform without creating an account (currently all features are accessible)</li>
              <li>• Contact us with any privacy concerns</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Contact</h2>
            <p className="text-secondary leading-relaxed">
              If you have any questions about this privacy policy, please contact us at{" "}
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
