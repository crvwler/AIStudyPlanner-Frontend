export default function RewardsDashboard({ sessions = 7 }) {
  const badges = [
    { title: "First Session", unlocked: sessions >= 1 },
    { title: "10 Sessions", unlocked: sessions >= 10 },
    { title: "Focus Master", unlocked: sessions >= 25 },
  ];

  return (
    <div className="mt-6">
      <h2 className="text-2xl font-bold mb-4">Your Badges</h2>
      <ul className="space-y-2">
        {badges.map((b, i) => (
          <li
            key={i}
            className={`p-3 rounded shadow ${
              b.unlocked
                ? "bg-green-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}>
            {b.title}
          </li>
        ))}
      </ul>
    </div>
  );
}
