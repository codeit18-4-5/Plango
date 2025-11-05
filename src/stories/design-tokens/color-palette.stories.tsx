import type { Meta, StoryObj } from "@storybook/nextjs-vite";

const colors = [
  "gray-100",
  "gray-200",
  "gray-300",
  "gray-400",
  "gray-500",
  "gray-600",
  "gray-700",
  "gray-800",
  "gray-900",
  "pink-50",
  "pink-100",
  "pink-200",
  "pink-300",
  "pink-400",
  "pink-500",
  "pink-600",
  "pink-700",
  "pink-800",
  "pink-900",
  "red-400",
  "rose-400",
  "orange-400",
  "yellow-400",
  "green-400",
  "blue-400",
  "purple-400",
  "black",
  "white",
  "gradient",
  "modal-frame",
  "modal-dimmed",
];

const meta: Meta = {
  title: "Design Tokens/Colors",
};
export default meta;

type Story = StoryObj;

export const Palette: Story = {
  render: () => (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "1rem" }}>
      {colors.map(color => (
        <div
          key={color}
          style={{
            textAlign: "center",
            backgroundColor: "var(--gray-800)",
            border: "1px solid var(--gray-700)",
            borderRadius: "10px",
            padding: "1rem",
          }}
        >
          <div
            style={{
              width: "100%",
              height: "60px",
              borderRadius: "8px",
              background: `var(--${color})`,
              border: "1px solid var(--gray-700)",
            }}
          />
          <p style={{ marginTop: "8px", fontSize: "14px", color: "var(--gray-300)" }}>{color}</p>
        </div>
      ))}
    </div>
  ),
};
