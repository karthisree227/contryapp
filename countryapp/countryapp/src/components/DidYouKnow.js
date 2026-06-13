import { facts } from "../data/facts";

function DidYouKnow() {
  const randomFact =
    facts[Math.floor(Math.random() * facts.length)];

  return (
    <div className="fact-card">
      <h3> Did You Know?</h3>
      <p>{randomFact}</p>
    </div>
  );
}

export default DidYouKnow;