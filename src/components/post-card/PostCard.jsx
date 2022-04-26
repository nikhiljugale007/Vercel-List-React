import "./PostCard.css";
import { avatar, Icon_delete } from "../../assets";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import { PostApi } from "../../apicalls/PostApi";
import { useAppContext } from "../../context/AppContext";
import { ThumbUpIcon, BookmarkIcon } from "@heroicons/react/outline";

const PostCard = ({ post, deleteCard, cardType }) => {
  const { username, content, updatedAt, likes, userId, media, _id } = post;
  const [expandPost, setExpandPost] = useState(false);
  const { authState, authDispatch } = useAuthContext();
  const { appDispatch } = useAppContext();
  const checkUserIsFollowed = () => {
    return (
      authState.user.following.find((user) => user.username === username) ||
      username === authState.user.username
    );
  };

  const followUser = async () => {
    const res = await PostApi(`/api/users/follow/${userId}`, {}, true);
    if (res.success) {
      authDispatch({ type: "UPDATE_USER", payload: res.data.user });
    } else {
      alert("Some error occurred, check console.");
    }
  };
  const unfollowUser = async () => {
    const res = await PostApi(`/api/users/unfollow/${userId}`, {}, true);
    if (res.success) {
      authDispatch({ type: "UPDATE_USER", payload: res.data.user });
    } else {
      alert("Some error occurred, check console.");
    }
  };
  const likePost = async () => {
    const { data, success } = await PostApi(`/api/posts/like/${_id}`, {}, true);
    if (success) {
      appDispatch({ type: "SET_FEED", payload: data.posts });
    } else {
      alert("Some error occurred, check console.");
    }
  };
  const dislikePost = async () => {
    const { data, success } = await PostApi(
      `/api/posts/dislike/${_id}`,
      {},
      true
    );
    if (success) {
      appDispatch({ type: "SET_FEED", payload: data.posts });
    } else {
      alert("Some error occurred, check console.");
    }
  };
  const bookmarkPost = async () => {
    const { data, success } = await PostApi(
      `api/users/bookmark/${_id}`,
      {},
      true
    );
    if (success) {
      authDispatch({ type: "UPDATE_USER_BOOKMARK", payload: data.bookmarks });
    } else {
      alert("Some error occurred, check console.");
    }
  };
  const removeBookmarkPost = async () => {
    const { data, success } = await PostApi(
      `api/users/remove-bookmark/${_id}`,
      {},
      true
    );
    if (success) {
      authDispatch({ type: "UPDATE_USER_BOOKMARK", payload: data.bookmarks });
    } else {
      alert("Some error occurred, check console.");
    }
  };
  const checkLikedPost = () => {
    const likedArray = likes.likedBy.filter(
      (user) => user._id === authState.user._id
    );
    if (likedArray.length === 0) return false;
    else return true;
  };
  const checkBookmarkedPost = () => {
    const temp = authState.user.bookmarks.filter((post) => post._id === _id);
    console.log(temp);
      if (temp.length === 0) return false;
    else return true;
  };
  return (
    <div className=" p-10 flex flex-col gap-5 border-t border-b bg-primary-bg-color w-full">
      <div className="flex flex-row items-center justify-between ">
        <Link
          to={`/profile/${userId}`}
          className="flex flex-row items-center gap-5"
        >
          <img src={avatar} alt="profile-pic" className="h-14 w-14" />
          <div className="flex flex-col">
            <p className="text-lg">{"@" + username}</p>
            <p className="text-xs text-gray-600">{updatedAt}</p>
          </div>
        </Link>
        {cardType === "DELETE_CARD" && (
          <button>
            <img
              src={Icon_delete}
              alt="delete"
              className="hover:bg-hover-color p-2 rounded-full"
            />
          </button>
        )}
        {cardType === "FOLLOW_CARD" && (
          <div>
            {!(username === authState.user.username) &&
              (checkUserIsFollowed() ? (
                <button
                  onClick={unfollowUser}
                  className="border p-1 px-2 rounded-md hover:bg-hover-color"
                >
                  UnFollow
                </button>
              ) : (
                <button
                  onClick={followUser}
                  className="border p-1 px-2 rounded-md hover:bg-hover-color"
                >
                  Follow
                </button>
              ))}
          </div>
        )}
      </div>
      <div>
        <p>{media ? "MEDIA" : "NO MEDIA"}</p>
        <p className={expandPost ? "" : "text-ellipsis max-h-24 "}>{content}</p>
        <button
          className="text-primary-color py-1 outline-none"
          onClick={() => setExpandPost((prev) => !prev)}
        >
          {expandPost ? "Read Less" : "Read More"}
        </button>
      </div>
      <div className="flex flex-row gap-20">
        {checkLikedPost() ? (
          <div
            className="flex flex-row items-center cursor-pointer gap-2"
            onClick={dislikePost}
          >
            <ThumbUpIcon className="p-2 h-10 w-10 stroke-primary-color  hover:bg-hover-color rounded-full" />
            <p>{likes.likedBy.length}</p>
          </div>
        ) : (
          <div
            className="flex flex-row items-center cursor-pointer gap-2 "
            onClick={likePost}
          >
            <ThumbUpIcon className="p-2 h-10 w-10  hover:bg-hover-color rounded-full" />
            <p>{likes.likedBy.length}</p>
          </div>
        )}
        {checkBookmarkedPost() ? (
          <div
            className="flex flex-row items-center cursor-pointer gap-2"
            onClick={removeBookmarkPost}
          >
            <BookmarkIcon className="p-2 h-10 w-10  stroke-primary-color  hover:bg-hover-color rounded-full cursor-pointer" />
          </div>
        ) : (
          <div
            className="flex flex-row items-center cursor-pointer gap-2 "
            onClick={bookmarkPost}
          >
            <BookmarkIcon className="p-2 h-10 w-10  hover:bg-hover-color rounded-full cursor-pointer" />
          </div>
        )}
      </div>
    </div>
  );
};

export default PostCard;
