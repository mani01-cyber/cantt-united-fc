"use client";

export default function PlayerHighlight() {
  const highlights = [
    {
      name: "shahid Aziz",
      role: "Best Player",
      img: "/player1.jpg",
      desc: "Top scorer and team captain."
    },
    {
      name: "umer",
      role: "Best Goalkeeper",
      img: "/player2.jpg",
      desc: "Most clean sheets in the league."
    },
    {
      name: "musayab",
      role: "Emerging Player",
      img: "/player3.jpg",
      desc: "Young talent with great potential."
    },
  ];
  return (
    <div className="max-w-6xl mx-auto py-12 grid md:grid-cols-3 gap-8">
      {highlights.map((p) => (
        <div key={p.name} className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center hover:scale-105 transition-transform duration-500 border-2 border-yellow-400">
          <img src={p.img} alt={p.name} className="w-32 h-32 rounded-full object-cover mb-4 border-4 border-yellow-400 shadow" />
          <h3 className="text-xl font-bold text-black mb-1">{p.name}</h3>
          <span className="text-sm font-semibold text-yellow-600 mb-2">{p.role}</span>
          <p className="text-gray-600 text-center">{p.desc}</p>
        </div>
      ))}
    </div>
  );
}
