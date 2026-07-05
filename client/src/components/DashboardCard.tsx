interface Props {
  title: string;
  value: number;
  color: string;
}

function DashboardCard({ title, value, color }: Props) {
  return (
    <div
      style={{
        background: color,
        color: "white",
        padding: "25px",
        borderRadius: "12px",
        minWidth: "220px",
        boxShadow: "0 5px 12px rgba(0,0,0,.15)",
      }}
    >
      <h3>{title}</h3>

      <h1
        style={{
          marginTop: "15px",
          fontSize: "40px",
        }}
      >
        {value}
      </h1>
    </div>
  );
}

export default DashboardCard;