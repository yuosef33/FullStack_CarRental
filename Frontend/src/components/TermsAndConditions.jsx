import React, { useState } from 'react';

const TermsAndConditions = () => {
  const [activeSec, setActiveSec] = useState("intro");

  const goToSec = (id) => {
    const sec = document.getElementById(id);
    if (sec) {
      sec.scrollIntoView({ behavior: "smooth" });
      setActiveSec(id);
    }
  };




  return (
    <div className="bg-gray-100 min-h-screen">

      <div className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold">Terms and Conditions</h1>
          <p className="mt-2">
            Please read the terms carefully before using our services, it’s really important!
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10">
        <div className="flex flex-col md:flex-row gap-8">
      
          <aside className="md:w-1/4">
            <div className="bg-white border border-gray-200 sticky top-8">
              <h2 className="text-xl font-semibold p-4 bg-gray-800 text-white">Table of Contents</h2>
              <nav className="p-2">
                {sections.map(({ id, title }) => (
                  <button
                    key={id}
                    onClick={() => goToSec(id)}
                    className={`block w-full text-left px-3 py-3 mb-1 transition-colors ${
                      activeSec === id
                        ? "bg-gray-800 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {title}
                  </button>
                ))}
              </nav>
            </div>
          </aside>

          <main className="md:w-3/4">
            {sections.map(({ id, title, image, content }) => (
              <section key={id} id={id} className="mb-8 bg-white border border-gray-200">
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/3 overflow-hidden">
                    <div className="h-full w-full relative group">
                      <img
                        src={image || "/placeholder.svg"}
                        alt={title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <span className="text-white font-bold text-lg">{title}</span>
                      </div>
                    </div>
                  </div>

                  <div className="md:w-2/3 p-6">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b border-gray-200 pb-2">
                      {title}
                    </h2>
                    <div className="text-gray-600 space-y-4">
                      {content}
                    </div>
                  </div>
                </div>
              </section>
            ))}
          </main>
        </div>
      </div>
    </div>
  );
};

const sections = [
  {
    id: "intro",
    title: "1. Introduction",
    image: "/styx12.jpg",
    content: (
      <>
        <p>
          Welcome to Venom Car Rental! These terms explain how you can use our services. By using the site or booking a car, you agree to these.
        </p>
        <p>
          We're just trying to help you rent cars. These terms form a legal contract between you (the renter) and us (Venom Car Rental).
        </p>
      </>
    ),
  },
  {
    id: "def",
    title: "2. Definitions",
    image: "/gettyimages-2040200463-1200x675.jpeg",
    content: (
      <ul className="list-disc pl-5 space-y-2">
        <li><strong>Agreement:</strong> The contract between you and us, including these terms.</li>
        <li><strong>Vehicle:</strong> The car (or replacement) you rent from us.</li>
        <li><strong>Rental Period:</strong> The time from when you pick up the car to when you return it.</li>
        <li><strong>Charges:</strong> What you pay us for renting, including fees and taxes.</li>
        <li><strong>Loss or Damage:</strong> Includes theft, damage, or towing costs.</li>
      </ul>
    ),
  },
  {
    id: "eligibility",
    title: "3. Eligibility Requirements",
    image: "/styx9.jpeg",
    content: (
      <>
        <p>Here’s what you need to rent a car from us:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Be 21 or older (25 for luxury cars)</li>
          <li>Have a valid driver’s license for at least a year</li>
          <li>Have a credit card in your name</li>
          <li>Pass our checks (credit, insurance, etc.)</li>
        </ul>
      </>
    ),
  },
  {
    id: "reservation",
    title: "4. Reservation and Confirmation",
    image: "/GettyImages-1880145928-900x600.jpg",
    content: (
      <>
        <p>You can book a car online, by phone, or in person. We'll make sure we have a car in your chosen category (not necessarily the exact model).</p>
        <p>After booking, we'll send you a confirmation email. Please check the details, and tell us if anything's wrong.</p>
      </>
    ),
  },
  {
    id: "payment",
    title: "5. Payment and Fees",
    image: "/images246565.jpeg",
    content: (
      <>
        <p>We accept:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Visa, MasterCard, AmEx</li>
          <li>Debit cards (some conditions apply)</li>
          <li>Corporate billing (with approval)</li>
        </ul>
        <p className="mt-3">
          When you pick up the car, we'll place a deposit on your card. The amount depends on the car type and rental period.
        </p>
      </>
    ),
  },
  {
    id: "insurance",
    title: "6. Insurance and Liability",
    image: "/ANI-20240814113657.jpg",
    content: (
      <>
        <p>All rentals include basic insurance coverage. Here's what's covered:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Collision Damage Waiver (CDW) – with deductible</li>
          <li>Third-party liability (as required by law)</li>
          <li>Theft Protection – with deductible</li>
        </ul>
      </>
    ),
  },
  {
    id: "restrictions",
    title: "7. Vehicle Use Restrictions",
    image: "/imdsfs.png",
    content: (
      <>
        <p>Please don't use the car for:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>If you're not listed as a driver</li>
          <li>Under the influence of alcohol or drugs</li>
          <li>For illegal activities</li>
          <li>To tow or push things</li>
          <li>In any kind of race</li>
        </ul>
      </>
    ),
  },
  {
    id: "cancellation",
    title: "8. Cancellation Policy",
    image: "/21386651.png",
    content: (
      <>
        <p>Our refund policy depends on when you cancel:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>More than 48 hours: Full refund</li>
          <li>24–48 hours: 75% refund</li>
          <li>12–24 hours: 50% refund</li>
          <li>Less than 12 hours: No refund</li>
        </ul>
      </>
    ),
  },
];

export default TermsAndConditions;
