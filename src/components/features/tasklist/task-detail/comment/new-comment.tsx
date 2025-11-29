import { ReplyInput } from "@/components/ui";
import { taskCommentsSchema } from "@/lib/schema";
import { Controller, useFormContext } from "react-hook-form";
import z4 from "zod/v4";

export default function NewCommentField() {
  const {
    control,
    formState: { errors },
  } = useFormContext<z4.infer<typeof taskCommentsSchema>>();

  return (
    <div className="relative">
      <p className="absolute top-[-20px] text-body-s text-pink-500">
        {errors.content && errors.content.message}
      </p>
      <div>
        <Controller
          name="content"
          control={control}
          render={({ field }) => <ReplyInput variant="secondary" {...field} />}
        />
      </div>
    </div>
  );
}
