import React from "react";

export const Content = ({ activeTab }) => {
  const content = {
    'About the Place': (
      <div className="bg-gray-800 p-6 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">About the Place</h2>
        <p>
          Varanasi, also known as Kashi, is one of the oldest continuously inhabited cities in the world. It is considered the
          spiritual capital of India and is famous for its ghats along the holy river Ganges. The city is known for its religious and
          cultural significance, attracting millions of pilgrims and tourists every year. Varanasi is home to numerous temples,
          ashrams, and spiritual centers, making it a popular destination for those seeking spiritual enlightenment. The narrow
          streets of the old city are filled with vibrant markets, bustling with activity. The city also has a rich heritage of music,
          dance, and art, with classical music and dance performances regularly held in various venues.
        </p>
      </div>
    ),
    // Add other tab contents here
  };

  return content[activeTab] || <div>Content for {activeTab} tab</div>;
};

