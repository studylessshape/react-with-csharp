import { Toast } from "@douyinfe/semi-ui";
import {
  getAccessResource,
  getUserProfile,
  type FeatResource,
  type UserProfile,
} from "../services";
import { type UserInfo } from "../stores";
import { handleResp } from "./resp_flow";

export interface UserResourceIn {
  userProfile?: UserProfile;
  setFeatResource: (resource?: FeatResource[]) => void;
  setUser: (user: UserInfo) => void;
}

export async function getAndSetUser(input: UserResourceIn) {
  const { setFeatResource, setUser } = input;
  var userProfile = input.userProfile;

  if (!userProfile) {
    const response = await getUserProfile();
    if (response.success && response.data) {
      userProfile = response.data;
    } else {
      Toast.error({
        content: `${response.code}: ${response.message ?? "获取用户信息失败"}`,
      });
      return;
    }
  }

  await handleResp(getAccessResource(), {
    handleOk: (feats) => {
      setFeatResource(feats);
      setUser({
        routes: feats.filter((f) => f.kind == 0 && f.url).map((f) => f.url),
        permissions: feats.filter((f) => f.kind == 1).map((f) => f.name),
        ...userProfile,
      });
    },
    defaultMessage: "获取资源失败",
  });
}
