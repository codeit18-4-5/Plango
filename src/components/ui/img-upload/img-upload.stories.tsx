import type { Meta } from "@storybook/react";
import { useForm, FormProvider } from "react-hook-form";
import { ImgUpload } from "@/components/ui";

const meta: Meta<typeof ImgUpload> = {
  title: "UI/ImgUpload",
  component: ImgUpload,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "ImgUpload 컴포넌트",
      },
    },
  },
  argTypes: {},
};

export default meta;

export const ImgUploadStory = () => {
  const methods = useForm();
  return (
    <FormProvider {...methods}>
      <ImgUpload id="image" onChange={() => {}} />
    </FormProvider>
  );
};
