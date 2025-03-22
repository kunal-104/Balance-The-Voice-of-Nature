import React from "react";

const AboutUsPage = () => {
  return (
    <div className="bg-gray-100 text-gray-800 min-h-screen w-screen absolute left-0 top-12 py-10 px-4 sm:px-10">
      <h1 className="text-6xl mb-10">About Us</h1>
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Introduction & Vision */}
        <section className="bg-white p-6 md:p-10 rounded-2xl shadow-lg">
          <h1 className="text-3xl font-bold text-green-600 mb-4">Who We Are</h1>
          <p className="text-lg">
            Welcome to <span className="font-semibold">Balance</span>, a pioneering digital social platform dedicated to
            environmental advocacy, sustainability, and climate action.
          </p>
          <p className="mt-2 text-lg">
            We provide a collaborative space where environmentalists, activists, researchers, and policymakers work together to
            drive real change towards a sustainable future.
          </p>
        </section>

        {/* Vision */}
        <section className="bg-white p-6 md:p-10 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-bold text-green-600 mb-4">Our Vision</h2>
          <ul className="list-disc list-inside space-y-2 text-lg">
            <li>Environmental issues receive the urgency they deserve.</li>
            <li>Communities and individuals work together to create tangible impact.</li>
            <li>Sustainable solutions are accessible, actionable, and scalable.</li>
            <li>Technology is leveraged to amplify voices and accelerate progress.</li>
          </ul>
        </section>

        {/* Mission & Core Values */}
        <section className="bg-white p-6 md:p-10 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-bold text-green-600 mb-4">Our Mission</h2>
          <ul className="list-disc list-inside space-y-2 text-lg">
            <li>Empower activists and environmentalists to raise awareness.</li>
            <li>Provide a knowledge-sharing platform for sustainability research.</li>
            <li>Encourage collaboration among individuals, NGOs, and businesses.</li>
            <li>Leverage digital tools to drive real-world impact.</li>
          </ul>
        </section>

        {/* What We Offer */}
        <section className="bg-white p-6 md:p-10 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-bold text-green-600 mb-4">What We Offer</h2>
          <div className="space-y-4 text-lg">
            <p><span className="font-semibold">🌱 A Platform for Environmental Voices:</span> Share personal stories, research, and campaigns.</p>
            <p><span className="font-semibold">🤝 Community & Networking:</span> Join discussions, collaborate on projects, and connect globally.</p>
            <p><span className="font-semibold">📚 Knowledge Hub:</span> Access articles, reports, and expert insights on sustainability.</p>
            <p><span className="font-semibold">📢 Campaigns & Advocacy:</span> Promote petitions, protests, and awareness drives.</p>
          </div>
        </section>

        {/* Why Join Us */}
        <section className="bg-white p-6 md:p-10 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-bold text-green-600 mb-4">Why Join Us?</h2>
          <p className="text-lg">Climate change is accelerating at an alarming rate. Our platform provides a focused space for impactful discussions, global connections, and action-driven tools to drive real change.</p>
        </section>

        {/* Get Involved */}
        <section className="bg-green-600 text-white p-6 md:p-10 rounded-2xl shadow-lg text-center">
          <h2 className="text-3xl font-bold mb-4">Get Involved & Join the Movement</h2>
          <ul className="list-disc list-inside space-y-2 text-lg text-left mx-auto max-w-lg">
            <li>✅ Sign Up & Engage – Join discussions and share knowledge.</li>
            <li>✅ Start or Support a Campaign – Raise awareness and take action.</li>
            <li>✅ Connect & Collaborate – Partner with activists, NGOs, and policymakers.</li>
            <li>✅ Participate in Events – Join webinars and sustainability workshops.</li>
          </ul>
          <button className="mt-6 bg-white text-green-600 font-semibold px-6 py-3 rounded-full shadow-md hover:bg-gray-200 transition">
            🌍 Sign Up Now
          </button>
        </section>
      </div>
    </div>
  );
};

export default AboutUsPage;
