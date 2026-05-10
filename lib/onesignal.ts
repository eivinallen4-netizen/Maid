import OneSignal from "react-onesignal";

export async function getSubscriptionStatus() {
  try {
    const isSubscribed = OneSignal.User.PushSubscription.optedIn;
    return isSubscribed;
  } catch (error) {
    console.error("Failed to get subscription status:", error);
    return false;
  }
}

export async function setSubscriptionStatus(opted: boolean) {
  try {
    OneSignal.User.PushSubscription.optIn();
  } catch (error) {
    console.error("Failed to set subscription status:", error);
  }
}

export async function sendTag(key: string, value: string) {
  try {
    OneSignal.User.addTag(key, value);
  } catch (error) {
    console.error("Failed to add tag:", error);
  }
}

export async function removeTags(keys: string[]) {
  try {
    for (const key of keys) {
      OneSignal.User.removeTag(key);
    }
  } catch (error) {
    console.error("Failed to remove tags:", error);
  }
}

export async function getPlayerId() {
  try {
    const userId = await OneSignal.User.PushSubscription.id;
    return userId;
  } catch (error) {
    console.error("Failed to get player ID:", error);
    return null;
  }
}

export async function tagAsAdmin() {
  try {
    OneSignal.User.addTag("role", "admin");
  } catch (error) {
    console.error("Failed to tag user as admin:", error);
  }
}
