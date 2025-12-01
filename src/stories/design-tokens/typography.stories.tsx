import type { Meta, StoryObj } from "@storybook/nextjs";

const texts = [
  { name: "text-heading-xl", label: "title", size: 48, tb: 28, mb: 28 },
  { name: "text-heading-l", label: "h1", size: 40, tb: 24, mb: 24 },
  { name: "text-heading-m", label: "h2", size: 24, tb: 24, mb: 18 },
  { name: "text-heading-s", label: "h3", size: 20, tb: 20, mb: 16 },
  { name: "text-body-l", label: "Body-1", size: 18, tb: 18, mb: 14 },
  { name: "text-body-m", label: "Body-2", size: 16, tb: 16, mb: 14 },
  { name: "text-body-s", label: "Body-3", size: 14, tb: 14, mb: 14 },
  { name: "text-body-xs", label: "Body-4", size: 12, tb: 12, mb: 12 },
  { name: "text-modal", label: "Modal Title", size: 16, tb: 16, mb: 14 },
  { name: "text-caption", label: "Caption", size: 14, tb: 14, mb: 14 },
];

const meta: Meta = {
  title: "Design Tokens/Typography",
};
export default meta;

type Story = StoryObj;

export const TextStyles: Story = {
  render: () => (
    <div className="grid gap-6 p-1">
      <div>
        <h3 className="mb-2 text-heading-s">Font Family</h3>
        <div className="rounded-lg border border-gray-700 bg-gray-800 p-4">
          <span className="text-body-l">Pretendard</span>
        </div>
      </div>
      <div>
        <h3 className="mb-2 text-heading-s">Font Size</h3>
        <div className="rounded-lg border border-gray-700 bg-gray-800 py-2">
          <div className="grid grid-cols-[0.7fr_1.5fr_1fr_1fr_1fr] items-center gap-2 border-b border-gray-700 p-4">
            {["Tag", "Class Name", "Desktop", "Tablet", "Mobile"].map((header, index) => (
              <span key={index} className="text-gray-500">
                {header}
              </span>
            ))}
          </div>
          {texts.map(t => (
            <div
              key={t.name}
              className={`${t.name} grid grid-cols-[0.7fr_1.5fr_1fr_1fr_1fr] items-center gap-2 border-b border-gray-700 p-4 last:border-b-0`}
            >
              <span>{t.label}</span>
              <span>{t.name}</span>
              <span>{t.size}px</span>
              <span>{t.tb}px</span>
              <span>{t.mb}px</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
};
