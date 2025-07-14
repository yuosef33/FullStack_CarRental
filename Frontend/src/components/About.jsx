import React, { useState } from "react";

const teamTabs = ["All", "Manager", "Investor", "Mechanic", "Sales", "Support"];

const teamData = [
  {
    name: "Sophia Bennett",
    role: "Manager",
    experience: "10+ yrs",
    photo: "/manager1.jpg",
  },
  {
    name: "Dylan Brooks",
    role: "Manager",
    experience: "18+ yrs",
    photo: "/manager2.jpg",
  },
  {
    name: "Nathan Hayes",
    role: "Investor",
    experience: "10+ yrs",
    photo: "/investor1.jpg",
  },
  {
    name: "Emily Rivers",
    role: "Investor",
    experience: "6+ yrs",
    photo: "/investor2.jpg",
  },
  {
    name: "Noah Jackson",
    role: "Mechanic",
    experience: "7+ yrs",
    photo: "/mechanic1.jpg",
  },
  {
    name: "Lily Anderson",
    role: "Mechanic",
    experience: "7+ yrs",
    photo: "/mechanic2.jpg",
  },
  {
    name: "Ava Thompson",
    role: "Sales",
    experience: "3+ yrs",
    photo: "/sales1.jpg",
  },
  {
    name: "Chloe Wilson",
    role: "Sales",
    experience: "4+ yrs",
    photo: "/sales2.jpg",
  },
  {
    name: "Mason Turner",
    role: "Support",
    experience: "4+ yrs",
    photo: "/support1.jpg",
  },
  {
    name: "Lucas Reed",
    role: "Support",
    experience: "2+ yrs",
    photo: "/support2.jpg",
  },
];

const About = () => {
  const [activeTab, setActiveTab] = useState("All");

  const filteredData =
    activeTab === "All"
      ? teamData
      : teamData.filter((member) => member.role === activeTab);

  const getObjectPosition = (name) => {
    switch (name) {
      case "Sophia Bennett":
        return "object-[center_top]";
      case "Nathan Hayes":
        return "object-[center_10%]";
      case "Emily Rivers":
        return "object-[center_20%]";
      case "Lily Anderson":
        return "object-[center_25%]";
      case "Mason Turner":
        return "object-[center_10%]";
      case "Dylan Brooks":
        return "object-[center_16%]";
      case "Ava Thompson":
        return "object-[center_33%]";
        default:
        return "object-center";
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">MEET OUR TEAM</h2>

      <div className="flex justify-center gap-4 mb-6 flex-wrap">
        {teamTabs.map((tab) => (
          <button
            key={tab}
            className={`px-4 py-2 rounded ${
              activeTab === tab
                ? "bg-gray-800 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredData.map((member, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-lg overflow-hidden text-center"
          >
            <img
              src={member.photo}
              alt={member.name}
              className={`w-full h-60 object-cover ${getObjectPosition(member.name)}`}
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold">{member.name}</h3>
              <p className="text-gray-500">{member.role}</p>
              <p className="text-sm text-gray-400">Experience: {member.experience}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default About;
