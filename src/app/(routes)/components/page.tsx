"use client";

import { Container } from "@/components/layout";
import { Checkbox, Input } from "@/components/ui";
import InputLabel from "@/components/ui/input/input-label";
import { useState } from "react";

function CheckboxControllerDemo() {
  const [checked, setChecked] = useState(false);

  return (
    <div className="space-y-6">
      <section>
        <h3 className="mb-2 text-base">Controlled</h3>
        <Checkbox checked={checked} onChange={setChecked} label={checked ? "완료됨" : "작업하기"} />

        <div className="mt-3 flex gap-2">
          <button
            type="button"
            onClick={() => setChecked(prev => !prev)}
            className="rounded border border-gray-600 px-3 py-1 text-sm"
          >
            Toggle
          </button>
          <button
            type="button"
            onClick={() => setChecked(true)}
            className="rounded border border-gray-600 px-3 py-1 text-sm"
          >
            Done
          </button>
          <button
            type="button"
            onClick={() => setChecked(false)}
            className="rounded border border-gray-600 px-3 py-1 text-sm"
          >
            Undo
          </button>
        </div>
        <Checkbox checked readOnly label="읽기 전용" />
      </section>
      <InputLabel />
      <Input id="password" errorMsg="">
        <Input.Label label="비밀번호" />
        <Input.Password />
        <Input.Error />
      </Input>
      <Input id="searchBar">
        <Input.Label label="검색창" hidden />
        <Input.Search />
      </Input>
    </div>
  );
}

export default function Components() {
  return (
    <Container>
      <CheckboxControllerDemo />
    </Container>
  );
}
