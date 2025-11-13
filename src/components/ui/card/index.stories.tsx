import type { Meta, StoryObj } from "@storybook/react";
import { Card } from "@/components/ui";

const meta: Meta<typeof Card> = {
  title: "UI/Card",
  component: Card,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: "Card 컴포넌트",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    id: {
      control: "number",
      description: "카드의 고유 ID",
    },
    href: {
      control: "text",
      description: "카드를 클릭 가능한 링크로 만들 URL",
    },
    actions: {
      control: "object",
      description: "카드 액션 메뉴 옵션들",
    },
    className: {
      control: "text",
      description: "추가 CSS 클래스",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Mock actions for stories
const mockActions = [
  {
    label: "수정하기",
    onClick: () => alert("수정하기 클릭"),
  },
  {
    label: "삭제하기",
    onClick: () => alert("삭제하기 클릭"),
  },
];

export const Default: Story = {
  args: {
    id: 1,
    actions: mockActions,
  },
  render: args => (
    <Card {...args}>
      <Card.Badge />
      <Card.Content
        title="카드 제목입니다. 두 줄까지 표시되며 그 이후는 말줄임표로 처리됩니다."
        image="/assets/images/img-test.jpeg"
      />
      <Card.Info
        writer="참깨"
        createdAt="2025-11-11T10:30:00Z"
        likeCount={11111}
        image="/assets/images/img-test.jpeg"
      />
    </Card>
  ),
};

export const WithLink: Story = {
  args: {
    id: 2,
    href: "#",
  },
  render: args => (
    <Card {...args}>
      <Card.Badge />
      <Card.Content title="링크 연결 가능한 카드" image="/assets/images/img-test.jpeg" />
      <Card.Info
        writer="참깨"
        createdAt="2025-11-11T10:30:00Z"
        likeCount={42}
        image="/assets/images/img-test.jpeg"
      />
    </Card>
  ),
};

export const WithActions: Story = {
  args: {
    id: 3,
    actions: mockActions,
  },
  render: args => (
    <Card {...args}>
      <Card.Badge />
      <Card.Content title="액션 메뉴가 있는 카드" image="/assets/images/img-test.jpeg" />
      <Card.Info
        writer="참깨"
        createdAt="2025-11-11T10:30:00Z"
        likeCount={42}
        image="/assets/images/img-test.jpeg"
      />
    </Card>
  ),
};

export const WithLinkAndActions: Story = {
  args: {
    id: 4,
    href: "#",
    actions: mockActions,
  },
  render: args => (
    <Card {...args}>
      <Card.Badge />
      <Card.Content title="링크와 액션이 모두 있는 카드" image="/assets/images/img-test.jpeg" />
      <Card.Info
        writer="참깨"
        createdAt="2025-11-11T10:30:00Z"
        likeCount={42}
        image="/assets/images/img-test.jpeg"
      />
    </Card>
  ),
};

export const variant: Story = {
  args: {
    id: 5,
    actions: mockActions,
  },
  render: args => (
    <Card {...args}>
      <Card.Badge variant="new" />
      <Card.Content
        title="variant 있는 카드 (베스트 게시글: 날짜, 작성자 순서 변경)"
        image="/assets/images/img-test.jpeg"
      />
      <Card.Info
        variant="secondary"
        writer="참깨"
        createdAt="2025-11-11T10:30:00Z"
        likeCount={42}
        image="/assets/images/img-test.jpeg"
      />
    </Card>
  ),
};

export const WithoutImage: Story = {
  args: {
    id: 6,
  },
  render: args => (
    <div className="grid gap-3">
      <Card {...args}>
        <Card.Badge />
        <Card.Content
          title={`이미지가 없는 카드 \n 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 내용 `}
        />
        <Card.Info
          writer="참깨"
          createdAt="2025-11-11T10:30:00Z"
          likeCount={42}
          image="/assets/images/img-test.jpeg"
        />
      </Card>
      <Card {...args}>
        <Card.Badge />
        <Card.Content title="대체 이미지" image="/" />
        <Card.Info
          writer="참깨"
          createdAt="2025-11-11T10:30:00Z"
          likeCount={42}
          image="/assets/images/img-test.jpeg"
        />
      </Card>
    </div>
  ),
};

export const TestGrid: Story = {
  parameters: {
    layout: "fullscreen",
  },
  render: () => (
    <div className="bg-gray-900 p-8">
      <h2 className="mb-6 text-xl font-bold text-white">테스트</h2>
      <div className="grid grid-cols-1 gap-6 tablet:grid-cols-2">
        <Card {...{ id: 7, actions: mockActions }}>
          <Card.Badge />
          <Card.Content title="dfjsdlfjsdkfjdsklfjdklfjskdlfjskdlfjskldfjskfjsdlkfjsldfkjslfjslkfjslkfjfjslkfjslkdfjlskdjflksjflskj" />
          <Card.Info
            writer="참깨"
            createdAt="2025-11-11T10:30:00Z"
            likeCount={11111}
            image="/assets/images/img-test.jpeg"
          />
        </Card>
        <Card {...{ id: 7, actions: mockActions }}>
          <Card.Content title="dfjsdlfjsdkfjdsklfjdklfjskdlfjskdlfjskldfjskfjsdlkfjsldfkjslfjslkfjslkfjfjslkfjslkdfjlskdjflksjflskj" />
          <Card.Info
            writer="dfsdfsdfsdfsdfsfsdfsdfsdfsfsfsfdsfsdfsfsdfsfsdfs"
            createdAt="2025-11-01T10:30:00Z"
            likeCount={11111}
            image="/assets/images/img-test.jpeg"
          />
          <Card.Badge />
        </Card>
        <Card {...{ id: 7, actions: mockActions }}>
          <Card.Badge />
          <Card.Info
            writer="dfsdfsdfsdfsdfsfsdfsdfsdfsfsfsfdsfsdfsfsdfsfsdfs"
            createdAt="2025-11-11T10:30:00Z"
            likeCount={11111}
            image="/assets/images/img-test.jpeg"
          />
          <Card.Content title="dfjsdlfjsdkfjdsklfjdklfjskdlfjskdlfjskldfjskfjsdlkfjsldfkjslfjslkfjslkfjfjslkfjslkdfjlskdjflksjflskj" />
        </Card>
        <Card {...{ id: 7, actions: mockActions }}>
          <Card.Info
            writer="dfsdfsdfsdfsdfsfsdfsdfsdfsfsfsfdsfsdfsfsdfsfsdfs"
            createdAt="2025-11-11T10:30:00Z"
            likeCount={11111}
            image="/assets/images/img-test.jpeg"
          />
          <Card.Content title="dfjsdlfjsdkfjdsklfjdklfjskdlfjskdlfjskldfjskfjsdlkfjsldfkjslfjslkfjslkfjfjslkfjslkdfjlskdjflksjflskj" />

          <Card.Badge />
        </Card>
      </div>
    </div>
  ),
};
