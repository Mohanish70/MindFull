import './ChallengeList.css';

const ChallengeList = ({ challenges, onJoin }) => {
  if (!challenges || challenges.length === 0) {
    return (
      <div className="no-challenges">
        <p>No challenges available at the moment.</p>
        <p>Check back later for new challenges!</p>
      </div>
    );
  }

  return (
    <div className="challenge-list">
      {challenges.map((challenge) => (
        <div key={challenge.id} className="challenge-card">
          <div className="challenge-content">
            <h4 className="challenge-title">{challenge.name}</h4>
            <p className="challenge-description">{challenge.description}</p>
            <div className="challenge-meta">
              <span className="challenge-duration">
                ⏳ {challenge.duration} days
              </span>
              <span className="challenge-participants">
                👥 {challenge.participants} joined
              </span>
            </div>
          </div>
          <button
            className={`join-button ${challenge.joined ? 'joined' : ''}`}
            onClick={() => onJoin(challenge.id)}
            disabled={challenge.joined}
          >
            {challenge.joined ? '✓ Joined' : 'Join Challenge'}
          </button>
        </div>
      ))}
    </div>
  );
};

export default ChallengeList;