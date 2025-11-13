export interface BaseAction {
  label: string;
  onClick: () => void;
}

export type CardAction = BaseAction;
export type ReplyAction = BaseAction;
