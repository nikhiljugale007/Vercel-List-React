import "./PostCard.css";
import { avatar } from "../../assets";
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  followUnFollowUserUserThunk,
  bookmarkPost,
  removeBookmarkPost,
} from "../../redux/authSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  ThumbUpIcon,
  BookmarkIcon,
  PencilAltIcon,
  TrashIcon,
  AnnotationIcon,
} from "@heroicons/react/outline";
import { EditPostModal } from "../modal/EditPostModal";
import { likePost, dislikePost, deletePostThunk } from "../../redux/postSlice";

const PostCard = ({ post, cardType }) => {
  const { username, content, updatedAt, likes, userId, media, _id } = post;
  const [expandPost, setExpandPost] = useState(false);
  const [showEditPostModal, setShowEditPostModal] = useState(false);
  const { user } = useSelector((state) => state.authSlice);
  const dispatch = useDispatch();
  const checkUserIsFollowed = () => {
    return (
      user.following.find(
        (userFollowing) => userFollowing.username === username
      ) || username === user.username
    );
  };

  const followUser = async () => {
    dispatch(followUnFollowUserUserThunk({ userId, type: "follow" }));
  };
  const unfollowUser = async () => {
    dispatch(followUnFollowUserUserThunk({ userId, type: "unfollow" }));
  };
  const likePostFunction = () => {
    dispatch(likePost({ _id }));
  };
  const dislikePostFunction = async () => {
    dispatch(dislikePost({ _id }));
  };
  const bookmarkPostFunction = async () => {
    dispatch(bookmarkPost({ _id }));
  };
  const removeBookmarkPostFunction = async () => {
    dispatch(removeBookmarkPost({ _id }));
  };

  const deletePost = async () => {
    dispatch(deletePostThunk({ _id }));
  };

  const editPost = () => {
    setShowEditPostModal(true);
  };
  const checkLikedPost = () => {
    const likedArray = likes.likedBy.filter(
      (userLiked) => userLiked._id === user._id
    );
    if (likedArray.length === 0) return false;
    else return true;
  };
  const checkBookmarkedPost = () => {
    const bookmaredArray = user.bookmarks.filter((post) => post._id === _id);
    if (bookmaredArray.length === 0) return false;
    else return true;
  };
  const checkPostIdOfLoggedUser = () => {
    return username === user.username;
  };
  const getTimeInDMY = (date) => {
    const dateF = new Date(date);
    const dmy =
      dateF.getDate() +
      " " +
      dateF.toLocaleString("default", { month: "long" }) +
      ", " +
      dateF.getFullYear();
    return dmy;
  };
  return (
    <div className=" p-10 flex flex-col gap-5 border-t border-b bg-primary-bg-color w-full">
      {showEditPostModal && (
        <EditPostModal
          setShowEditPostModal={setShowEditPostModal}
          post={post}
        />
      )}
      <div className="flex flex-row items-center justify-between ">
        <Link
          to={`/profile/${userId}`}
          className="flex flex-row items-center gap-5"
        >
          <img src={avatar} alt="profile-pic" className="h-14 w-14" />
          <div className="flex flex-col">
            <p className="text-lg">{"@" + username}</p>
            <p className="text-xs text-gray-600">{getTimeInDMY(updatedAt)}</p>
          </div>
        </Link>
        {checkPostIdOfLoggedUser() && (
          <div className="flex flex-row">
            <button onClick={deletePost}>
              <TrashIcon className="p-2 h-10 w-10 hover:bg-hover-color rounded-full" />
            </button>
            <button onClick={editPost}>
              <PencilAltIcon className="p-2 h-10 w-10 hover:bg-hover-color rounded-full" />
            </button>
          </div>
        )}

        {!(username === user.username) &&
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
      <div>
        {media && (
          <img
            className="max-w-full h-auto border p-2 rounded-md	object-cover"
            src={media}
            alt="post"
          />
        )}
        <p className={expandPost ? "" : "text-ellipsis max-h-24 "}>{content}</p>

        {content.length > 150 && (
          <button
            className="text-primary-color py-1 outline-none"
            onClick={() => setExpandPost((prev) => !prev)}
          >
            {expandPost ? "Read Less" : "Read More"}
          </button>
        )}
      </div>
      <div className="flex flex-row gap-20">
        {checkLikedPost() ? (
          <div
            className="flex flex-row items-center cursor-pointer gap-2"
            onClick={dislikePostFunction}
          >
            <ThumbUpIcon className="p-2 h-10 w-10 stroke-primary-color  hover:bg-hover-color rounded-full" />
            <p>{likes.likedBy.length}</p>
          </div>
        ) : (
          <div
            className="flex flex-row items-center cursor-pointer gap-2 "
            onClick={likePostFunction}
          >
            <ThumbUpIcon className="p-2 h-10 w-10  hover:bg-hover-color rounded-full" />
            <p>{likes.likedBy.length}</p>
          </div>
        )}
        {checkBookmarkedPost() ? (
          <div
            className="flex flex-row items-center cursor-pointer gap-2"
            onClick={removeBookmarkPostFunction}
          >
            <BookmarkIcon className="p-2 h-10 w-10  stroke-primary-color  hover:bg-hover-color rounded-full cursor-pointer" />
          </div>
        ) : (
          <div
            className="flex flex-row items-center cursor-pointer gap-2 "
            onClick={bookmarkPostFunction}
          >
            <BookmarkIcon className="p-2 h-10 w-10  hover:bg-hover-color rounded-full cursor-pointer" />
          </div>
        )}
        <Link
          to={`/post/${_id}`}
          className="flex flex-row items-center cursor-pointer gap-2 "
          // onClick={bookmarkPost}
        >
          <AnnotationIcon className="p-2 h-10 w-10  hover:bg-hover-color rounded-full cursor-pointer" />
        </Link>
      </div>
    </div>
  );
};

export default PostCard;
