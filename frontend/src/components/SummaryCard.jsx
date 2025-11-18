function SummaryCard({ title, number }) {
    return (
      <div className="bg-white p-6 rounded shadow text-center">
        <h2 className="text-lg font-semibold">{title}</h2>
        <p className="text-3xl font-bold mt-2">{number}</p>
      </div>
    );
  }
  
  export default SummaryCard;
  