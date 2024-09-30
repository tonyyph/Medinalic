type TextCustomColor =
  | "typo-primary"
  | "typo-subtitle"
  | "typo-disable"
  | "typo-quaternary"
  | "typo-link-button"
  | "typo-warning"
  | "typo-success";
type BackgroundCustomColor =
  | "brand-blue"
  | "main-background"
  | "sub-background"
  | "transparent-background"
  | "gray-background"
  | "badge-4-background"
  | "badge-3-background"
  | "badge-2-background"
  | "badge-1-background"
  | "white-background";

type StatusCustomColor =
  | "status-status-neutral-icon-line"
  | "status-error-icon"
  | "status-success-icon"
  | "status-warning-icon"
  | "status-warning-background"
  | "status-error-background"
  | "status-success-background"
  | "status-neutral-background";

type BorderCustomColor = "full-bleed" | "full-bleed-2";

type BasicColor = "black" | "white" | "transparent" | "current" | "inherit";
type ColorKey = Exclude<
  keyof import("tailwindcss/types/generated/colors").DefaultColors,
  BasicColor
>;
type ColorVariant =
  | "50"
  | "100"
  | "200"
  | "300"
  | "400"
  | "500"
  | "600"
  | "700"
  | "800"
  | "900"
  | "950";
type ColorName =
  | `${ColorKey}-${ColorVariant}`
  | BasicColor
  | TextCustomColor
  | BackgroundCustomColor
  | StatusCustomColor;
type IconProps = {
  size?: number;
  color?: ColorName;
  filled?: boolean;
  iconColor?: string;
} & import("react-native-svg").SvgProps;
type IconName = import("./components/commons").IconNameType;
type SelectItem = { value: string | number; label?: string };

declare module "*.png";

type DrawerItemData = {
  iconName: IconName;
  title: string;
  rightIconName?: IconName;
  onPress?: (arg?: any) => void;
  navigation?: any;
  screenName?: string;
  photoUri?: string;
  showCount?: boolean;
  count?: number;
};

type UserDetails = {
  id: string | number;
  legacyEid: string;
  username: string;
  firstname: string;
  lastname: string;
  primaryEmail: { text: string; verified: boolean };
  avatar: string;
  description: string | null;
  website: string | null;
  coverPhoto: string | null;
  followersCount: number;
  followeesCount: number;
};

type FeedSortKey =
  | "RECENT_POSTS_OR_COMMENTS"
  | "RECENT_POSTS"
  | "ACTIVE_POSTS"
  | "";

declare type SelectKey<T, V = string> = Exclude<
  {
    [P in keyof T]: T[P] extends V | undefined ? P : never;
  }[keyof T],
  undefined
>;
type FlagType = "Post" | "Comment";

type ModalConfirmationType = "Regular" | "Dangerous";

type POST = import("./api").FetchBoardPostDetail_findBoard_boardPost_Post;

declare type NavigationStackParamList = {
  Tab: undefined;
  Home: undefined;
  Details: undefined;
  Payment: undefined;
  HomeScreen: undefined;
};

declare type ScreenProps<T extends keyof NavigationStackParamList> =
  import("@react-navigation/native-stack").NativeStackScreenProps<
    NavigationStackParamList,
    T
  >;

declare type NavigationProps<T extends keyof NavigationStackParamList> =
  ScreenProps<T>["navigation"];

declare type RouteProps<T extends keyof NavigationStackParamList> =
  ScreenProps<T>["route"];
