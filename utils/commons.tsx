import moment from "moment-timezone";
import { ComponentType, memo, MemoExoticComponent } from "react";
import fastCompare from "react-fast-compare";
import { Dimensions, Text } from "react-native";
import ShortUniqueId from "short-unique-id";
import { tw } from "./tailwind";

export const SCREEN_HEIGHT = Dimensions.get("window").height;
export const SCREEN_WIDTH = Dimensions.get("window").width;
export const scaleOnHeight = (value: number) => (SCREEN_HEIGHT / 845) * value;
export const scaleOnWidth = (value: number) => (SCREEN_WIDTH / 390) * value;

export function memoFC<T extends ComponentType<any>>(
  component: T,
  ignoreProps?: string[]
): MemoExoticComponent<T> {
  return memo(component, (prev, next) => {
    if (ignoreProps?.length) {
      const prevProps = { ...prev };
      const nextProps = { ...next };
      ignoreProps.forEach((prop) => {
        // @ts-ignore
        delete prevProps[prop];
        // @ts-ignore
        delete nextProps[prop];
      });
      return fastCompare(prevProps, nextProps);
    }
    return fastCompare(prev, next);
  });
}

export const getColor = (color?: ColorName, defaultColor?: ColorName) => {
  try {
    if (color) {
      return tw.color(color);
    }
    if (defaultColor) {
      return tw.color(defaultColor);
    }
    return tw.color("white");
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (_) {
    return tw.color("white");
  }
};

export const enum PasswordCheckStrength {
  Short,
  Common,
  Weak,
  Ok,
  Strong
}

// Object to check password strengths and various properties
export class PasswordCheckService {
  // Expected length of all passwords
  public static get MinimumLength(): number {
    return 5;
  }

  // Regex to check for a common password string - all based on 5+ length passwords
  private commonPasswordPatterns =
    /passw.*|12345.*|09876.*|qwert.*|asdfg.*|zxcvb.*|footb.*|baseb.*|drago.*/;

  //
  // Checks if the given password matches a set of common password
  //
  public isPasswordCommon(password: string): boolean {
    return this.commonPasswordPatterns.test(password);
  }

  //
  // Returns the strength of the current password
  //
  public checkPasswordStrength(password: string): PasswordCheckStrength {
    // Build up the strenth of our password
    let numberOfElements = 0;
    numberOfElements = /.*[a-z].*/.test(password)
      ? ++numberOfElements
      : numberOfElements; // Lowercase letters
    numberOfElements = /.*[A-Z].*/.test(password)
      ? ++numberOfElements
      : numberOfElements; // Uppercase letters
    numberOfElements = /.*[0-9].*/.test(password)
      ? ++numberOfElements
      : numberOfElements; // Numbers
    numberOfElements = /[^a-zA-Z0-9]/.test(password)
      ? ++numberOfElements
      : numberOfElements; // Special characters (inc. space)

    // Assume we have a poor password already
    let currentPasswordStrength = PasswordCheckStrength.Short;

    // Check then strenth of this password using some simple rules
    if (
      password === null ||
      password.length < PasswordCheckService.MinimumLength
    ) {
      currentPasswordStrength = PasswordCheckStrength.Short;
    } else if (this.isPasswordCommon(password) === true) {
      currentPasswordStrength = PasswordCheckStrength.Common;
    } else if (
      numberOfElements === 0 ||
      numberOfElements === 1 ||
      numberOfElements === 2
    ) {
      currentPasswordStrength = PasswordCheckStrength.Weak;
    } else if (numberOfElements === 3) {
      currentPasswordStrength = PasswordCheckStrength.Ok;
    } else {
      currentPasswordStrength = PasswordCheckStrength.Strong;
    }

    // Return the strength of this password
    return currentPasswordStrength;
  }
}

export const wait = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const convertExtensionToMime = (ext?: string) => {
  switch (ext) {
    case "jpg":
    case "jpeg":
      return "image/jpeg";
    case "m4a":
      return "audio/m4a";
    case "png":
      return "image/png";
    case "gif":
      return "image/gif";
    case "mp4":
      return "video/mp4";
    case "mov":
      return "video/quicktime";
    case "mp3":
      return "audio/mpeg";
    case "wav":
      return "audio/wav";
    case "aac":
      return "audio/aac";
    case "flac":
      return "audio/flac";
    case "pdf":
      return "application/pdf";
    case "doc":
      return "application/msword";
    case "docx":
      return "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
    default:
      return "application/octet-stream";
  }
};

export const getAttachmentType = (
  ext?: string
): "video" | "image" | "audio" | "doc" | "file" => {
  switch (true) {
    case ext?.toLowerCase()?.endsWith("jpg"):
    case ext?.toLowerCase()?.endsWith("jpeg"):
    case ext?.toLowerCase()?.endsWith("png"):
    case ext?.toLowerCase()?.endsWith("gif"):
      return "image";
    case ext?.toLowerCase()?.endsWith("mp4"):
    case ext?.toLowerCase()?.endsWith("mov"):
      return "video";
    case ext?.toLowerCase()?.endsWith("m4a"):
    case ext?.toLowerCase()?.endsWith("mp3"):
    case ext?.toLowerCase()?.endsWith("wav"):
    case ext?.toLowerCase()?.endsWith("aac"):
    case ext?.toLowerCase()?.endsWith("flac"):
      return "audio";
    case ext?.toLowerCase()?.endsWith("pdf"):
    case ext?.toLowerCase()?.endsWith("doc"):
    case ext?.toLowerCase()?.endsWith("docx"):
      return "doc";
    default:
      return "file";
  }
};

export const getTimeRemaining = (
  endDate?: Date
): { days?: number; hours?: number; minutes?: number } => {
  if (!endDate) {
    return { days: undefined, hours: undefined, minutes: undefined };
  }
  const total = endDate.getTime() - new Date().getTime();

  if (total <= 0) {
    return { days: 0, hours: 0, minutes: 0 };
  }

  const days = Math.floor(total / (1000 * 60 * 60 * 24));
  const hours = Math.floor((total % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((total % (1000 * 60 * 60)) / (1000 * 60));

  return { days, hours, minutes };
};

export const getEndDateFromTimeRemaining = (timeRemaining: {
  days?: number;
  hours?: number;
  minutes?: number;
}): Date => {
  const now = new Date();
  const endDate = new Date(now.getTime());
  if (!timeRemaining.days && !timeRemaining.hours && !timeRemaining.minutes) {
    return endDate;
  }

  endDate.setDate(endDate.getDate() + (timeRemaining.days ?? 0));
  endDate.setHours(endDate.getHours() + (timeRemaining.hours ?? 0));
  endDate.setMinutes(endDate.getMinutes() + (timeRemaining.minutes ?? 0));

  return endDate;
};

export const generateUniqueId = (length?: number) => {
  const { randomUUID } = new ShortUniqueId();
  return randomUUID(length || 16);
};

export const getMeterText = (
  totalPointsEarned: number,
  finalEarnablePoints: number,
  ruleNoun: string
) => {
  if (totalPointsEarned === 0) {
    // return `This ${ruleNoun} is not currently worth any points.  Modify it to earn points.`
    return [
      `This ${ruleNoun} is not currently worth any points.  Modify it to earn points.`
    ];
  }
  return [
    `Submit now to earn `,
    <Text style={tw`font-primary-700`}>
      {totalPointsEarned < finalEarnablePoints
        ? totalPointsEarned
        : finalEarnablePoints}
    </Text>,
    ` points.`
  ];
};

const ornamentCount = 20;

const url = (n: number) =>
  `${process.env.EXPO_PUBLIC_YD_CDN_URL}/site_assets/ornament_${n}.one-third.png`;

export const generateAvatarImageUrl = (id: string | number) => {
  const hash = (parseInt(simpleHash(String(id)).slice(-3)) % ornamentCount) + 1;
  return url(hash);
};

/* eslint-disable no-bitwise */
export const simpleHash = (s: string) => {
  let a = 1;
  let c = 0;
  let h;
  let o;
  if (s) {
    a = 0;
    // eslint-disable-next-line no-plusplus
    for (h = s.length - 1; h >= 0; h--) {
      o = s.charCodeAt(h);
      a = ((a << 6) & 268435455) + o + (o << 14);
      c = a & 266338304;
      a = c !== 0 ? a ^ (c >> 21) : a;
    }
  }
  return String(a);
};

export const getTimeOfDay = () => {
  const hour = new Date().getHours();
  if (hour < 12) {
    return "Morning";
  }
  if (hour < 18) {
    return "Afternoon";
  }
  return "Evening";
};

export const blockedWordsErrorCode = "found-bad-words";

export const errorCodeToMessageMap: Record<string, string> = {
  "not-allowed-to-edit-post": "You are not allowed to edit this post.",
  "not-allowed-to-edit-draft": "You are not allowed to edit this draft.",
  "cannot-make-public-post-anonymous":
    "You cannot make a public post anonymous.",
  "mentioned-user-not-found-in-board":
    "The mentioned user was not found in the board.",
  "group-requested-but-not-enabled": "Group requested but not enabled.",
  "content-too-long": "The content is too long.",
  "cannot-post-in-group": "You cannot post in this group.",
  "topic-not-found-in-board": "The topic was not found in the board.",
  "topics-required": "A topic is required to save a draft post",
  "unpinning-an-unpinned-post": "You are unpinning an already unpinned post.",
  "not-allowed-to-pin-post": "You are not allowed to pin this post.",
  "mentioned-user-not-found-in-group":
    "The mentioned user was not found in the group.",
  "group-required-but-not-found":
    "Group-only Posting is enabled, but you're currently not a member of any group. Please contact the Community Owner."
};

// convert actionWithLoading to return a function

// export const actionWithLoading = <T extends any>(cb: () => Promise<T>) => {
//   return async () => {
//     let result;
//     showLoading();
//     try {
//       result = await cb();
//     } catch (error) {
//       hideLoading();
//       throw error;
//     }
//     hideLoading();
//     return result;
//   };
// };

export const actionWithTimeout = <T extends any>(
  cb: () => Promise<T>,
  onCallback: (result: T | null) => void
) => {
  return async () => {
    const timeout = new Promise<T>((_, reject) =>
      setTimeout(() => reject(new Error("Operation timed out")), 5000)
    );
    const result = await Promise.race([cb(), timeout]).catch(() => null);
    onCallback(result);
    const timedOut = result instanceof Error;

    return { result, timedOut };
  };
};
