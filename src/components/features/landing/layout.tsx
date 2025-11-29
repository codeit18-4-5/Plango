export function SectionHeader({
  title = "",
  gradientTitle = "",
  description = "",
  gradientColor = "",
  align = "center",
}: {
  title: string;
  description?: string;
  gradientTitle?: string;
  gradientColor?: string;
  align?: "left" | "center" | "right";
}) {
  return (
    <div
      className={`mb-[50px] ${align === "center" ? "text-center" : ""} ${align === "left" ? "text-left" : ""} ${align === "right" ? "text-right" : ""}`}
    >
      <h2 className="text-[48px] font-bold leading-tight">
        {title}
        <br />
        <span
          style={{
            background: gradientColor,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          {gradientTitle}
        </span>
      </h2>
      {description && <p className="mt-[20px] text-gray-200">{description}</p>}
    </div>
  );
}
