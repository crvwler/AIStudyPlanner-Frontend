import RewardsDashboard from "../components/UI/RewardsDashboard";

export default function RewardsPage() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Achievements & Rewards</h1>
      <RewardsDashboard sessions={12} />{" "}
      {/* You can replace 12 with dynamic value */}
    </div>
  );
}
