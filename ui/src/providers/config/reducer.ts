import { Access } from "@/domain/access";
import { EmailsSetting, Setting } from "@/domain/settings";
import { ConfigData } from "./";

type Action =
  | { type: "ADD_ACCESS"; payload: Access }
  | { type: "DELETE_ACCESS"; payload: string }
  | { type: "UPDATE_ACCESS"; payload: Access }
  | { type: "SET_ACCESSES"; payload: Access[] }
  | { type: "SET_EMAILS"; payload: Setting<EmailsSetting> }
  | { type: "ADD_EMAIL"; payload: string };

export const configReducer = (state: ConfigData, action: Action): ConfigData => {
  switch (action.type) {
    case "SET_ACCESSES": {
      return {
        ...state,
        accesses: action.payload,
      };
    }
    case "ADD_ACCESS": {
      return {
        ...state,
        accesses: [action.payload, ...state.accesses],
      };
    }
    case "DELETE_ACCESS": {
      return {
        ...state,
        accesses: state.accesses.filter((access) => access.id !== action.payload),
      };
    }
    case "UPDATE_ACCESS": {
      return {
        ...state,
        accesses: state.accesses.map((access) => (access.id === action.payload.id ? action.payload : access)),
      };
    }
    case "SET_EMAILS": {
      return {
        ...state,
        emails: action.payload,
      };
    }
    case "ADD_EMAIL": {
      return {
        ...state,
        emails: {
          ...state.emails,
          content: {
            emails: [...(state.emails.content as EmailsSetting).emails, action.payload],
          },
        },
      };
    }
    default:
      return state;
  }
};
