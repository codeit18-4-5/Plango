import postImagesUpload from "@/api/image/post-images-upload";
import { Controller } from "react-hook-form";
import type { Control, FieldValues, Path } from "react-hook-form";
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

type ImgUploadProps<T extends FieldValues = FieldValues> = {
  control: Control<T>;
  id: string;
  name: Path<T>;
};

export default function ImgUpload<T extends FieldValues = FieldValues>({
  control,
  id,
  name,
}: ImgUploadProps<T>) {
  const { preview, error, handleFile, clearPreview } = useImageUpload();

  return (
    <Controller
      control={control}
      name={name}
      defaultValue={undefined}
      render={({ field: { onChange, value } }) => {
        const handleUploadAndChange = async (file: File) => {
          const isValid = handleFile(file);
          if (!isValid) {
            onChange(null);
            return;
          }
          try {
            const { url } = await postImagesUpload({ url: file });
            onChange(url);
          } catch {
            onChange(null);
          }
        };

        const onFilesDrop = (files: File[]) => {
          const file = files[0];
          if (file) handleUploadAndChange(file);
        };

        const { isDragActive, onDragOver, onDragLeave, onDrop } = useFileDrop({
          onFiles: onFilesDrop,
        });

        const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          const file = e.target.files?.[0];
          if (file) handleUploadAndChange(file);
          e.target.value = "";
        };

        const clearAll = () => {
          clearPreview();
          onChange(null);
        };

        const showPreview = preview || value;
        const previewUrl = preview?.image || value;
        const previewName = preview?.name || "첨부 이미지";

        return (
          <>
            <div
              className={IMG_UPLOAD_STYLES.wrapper(!showPreview, !!error, isDragActive)}
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
              {!showPreview ? (
                <label htmlFor={id} className={IMG_UPLOAD_STYLES.label(isDragActive)}>
                  <IcPlus className={IMG_UPLOAD_STYLES.icon.plus(isDragActive)} />
                  <span className="text-center">
                    {isDragActive ? (
                      "이미지를 여기에 드롭하세요."
                    ) : (
                      <>
                        여기로 이미지를 드래그하거나 <br /> 클릭해서 업로드하세요.
                      </>
                    )}
                  </span>
                </label>
              ) : previewUrl ? (
                <>
                  <Image
                    src={previewUrl}
                    alt={previewName}
                    fill
                    className={IMG_UPLOAD_STYLES.image}
                    priority
                    sizes="100vw"
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
              ) : null}
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
