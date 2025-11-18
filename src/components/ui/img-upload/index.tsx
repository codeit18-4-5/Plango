import { Controller } from "react-hook-form";
import type { Control } from "react-hook-form";
import { CreateArticleSchema } from "@/lib/schema";
import { useImageUpload, useFileDrop } from "@/hooks";
import { IMG_UPLOAD_STYLES } from "./index.styles";
import Image from "next/image";
import IcCancel from "@/assets/icons/ic-cancel.svg";
import IcPlus from "@/assets/icons/ic-plus.svg";

/**
 * 이미지 업로드 컴포넌트 (react-hook-form 연동)
 * 미리보기, 드래그앤드롭, 파일 선택
 * @author yeonsu
 * @param control react-hook-form의 control 객체
 * @param name 폼 필드 이름
 * @param id input id 속성 값
 *
 */

type ImgUploadProps = {
  control: Control<CreateArticleSchema>;
  id: string;
  name: keyof CreateArticleSchema;
};

export default function ImgUpload({ control, id, name }: ImgUploadProps) {
  return (
    <Controller
      control={control}
      name={name}
      defaultValue={null}
      render={({ field: { onChange } }) => {
        const { preview, error, handleFile, clearPreview } = useImageUpload();

        const onFilesDrop = (files: File[]) => {
          const file = files[0];
          if (!file) return;

          const isValid = handleFile(file);
          if (!isValid) {
            onChange(null);
            return;
          }
          const reader = new FileReader();
          reader.onload = () => {
            onChange(reader.result as string);
          };
          reader.readAsDataURL(file);
        };

        const { onDragOver, onDragLeave, onDrop } = useFileDrop({
          onFiles: onFilesDrop,
        });

        const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          const file = e.target.files?.[0];
          if (!file) return;

          const isValid = handleFile(file);
          if (!isValid) {
            onChange(null);
            e.target.value = "";
            return;
          }
          const reader = new FileReader();
          reader.onload = () => {
            onChange(reader.result as string);
          };
          reader.readAsDataURL(file);
          e.target.value = "";
        };

        const clearAll = () => {
          clearPreview();
          onChange(null);
        };

        return (
          <>
            <div
              className={IMG_UPLOAD_STYLES.wrapper(!preview, !!error)}
              onDragOver={onDragOver}
              onDragLeave={onDragLeave}
              onDrop={onDrop}
            >
              <input
                id={id}
                name={name}
                type="file"
                accept="image/*"
                onChange={onInputChange}
                className={IMG_UPLOAD_STYLES.input}
              />
              {!preview ? (
                <label htmlFor={id} className={IMG_UPLOAD_STYLES.label}>
                  <IcPlus className={IMG_UPLOAD_STYLES.icon.plus} />
                  <span>이미지 등록</span>
                </label>
              ) : (
                <>
                  <Image
                    src={preview.image}
                    alt={preview.name}
                    fill
                    className={IMG_UPLOAD_STYLES.image}
                  />
                  <button
                    type="button"
                    onClick={clearAll}
                    aria-label="등록 이미지 삭제"
                    className={IMG_UPLOAD_STYLES.button}
                  >
                    <IcCancel className={IMG_UPLOAD_STYLES.icon.cancel} />
                  </button>
                </>
              )}
            </div>
            {error && (
              <span className={IMG_UPLOAD_STYLES.errorMsg} role="alert">
                {error}
              </span>
            )}
          </>
        );
      }}
    />
  );
}
