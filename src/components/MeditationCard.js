import './MeditationCard.css';

function MeditationCard({ title, description, onStart, image }) {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      <img src={image || '/path/to/default-avatar.png'} alt={title} className="w-full h-40 object-cover rounded-lg" />
      <h2 className="text-xl font-semibold mt-4">{title}</h2>
      <p className="mt-2">{description}</p>
      <button
        onClick={onStart} 
        className="bg-blue-500 text-white px-4 py-2 mt-4 rounded-lg hover:bg-blue-600 transition-colors"
      >
        Start
      </button>
    </div>
  );
}

export default MeditationCard;
