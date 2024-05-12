import Conversation from "../models/conversation.model.js";
import User from "../models/user.model.js";

export const getConversationUsers = async (req, res) => {
  if (!req.user || !req.user.id) {
    console.error("User ID is undefined");
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const loggedInUserId = req.user.id.toString(); // Use .id here
    console.log("Logged in user ID:", loggedInUserId);

    const conversations = await Conversation.find({
      participants: { $in: [loggedInUserId] },
    }).select("participants -_id");
    console.log("Conversations:", conversations);

    const userIds = conversations.flatMap((conv) =>
      (conv.participants || []).filter(
        (id) => id && id.toString() !== loggedInUserId
      )
    );

    const uniqueUserIds = [...new Set(userIds.map((id) => id.toString()))];
    console.log("Unique User IDs:", uniqueUserIds);

    const users = await User.find({
      _id: { $in: uniqueUserIds },
    }).select("-password");
    console.log("Filtered Users:", users);

    res.status(200).json(users);
  } catch (error) {
    console.error("Error in getConversationUsers: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getChats = async (req, res) => {
  if (!req.user || !req.user.id) {
    console.error("User ID is undefined");
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const loggedInUserId = req.user.id.toString(); // Use .id here

    const filteredUsers = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");

    res.status(200).json(filteredUsers);
  } catch (error) {
    console.error("Error in getUsersForSidebar: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
