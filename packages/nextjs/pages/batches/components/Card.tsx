interface CardProps {
  icon: string;
  title: string;
  description: string;
}

export const Card = ({ icon, title, description }: CardProps) => {
  return (
    <div className="bg-white/60 rounded-lg p-4 shadow-sm transition-shadow">
      <h3 className="font-bold mb-2 mt-2">
        {icon} {title}
      </h3>
      <p className="text-gray-700 mb-0">{description}</p>
    </div>
  );
};
