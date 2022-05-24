import "./Feed.css";
import { Icon_home, Icon_my_network, Icon_profile } from "../../assets";
import { Scroll } from "../scroll/Scroll";
import { Routes, Route, NavLink } from "react-router-dom";
import { Profile } from "../profile/Profile";
import { Network } from "../mynetwork/Network";
import { BookmarkIcon } from "@heroicons/react/outline";
import { Bookmark } from "../bookmark/Bookmark";
import { PostPage } from "../postpage/PostPage";
import { useSelector } from "react-redux";
const Feed = () => {
  const { user } = useSelector((store) => store.authSlice);
  const getActiveStyle = ({ isActive }) => ({
    backgroundColor: isActive ? "#E0E4E9" : "",
    fontWeight: isActive ? "600" : "normal",
  });
  const getMobileActiveStyle = ({ isActive }) => ({
    borderTop: isActive ? "2px solid #00aa45" : "",
  });
  return (
    <div className="flex md:flex-row flex-col w-full md:px-20">
      <aside className="sidebar h-screen p-5 w-60 bg-bg-off-white sticky top-0 ">
        <ul className="flex flex-col gap-2 ">
          <NavLink
            to="/scroll"
            className="flex flex-row gap-4  p-2 hover:cursor-pointer rounded-md"
            style={getActiveStyle}
          >
            <img src={Icon_home} alt="home" />
            <p>Scroll</p>
          </NavLink>
          <NavLink
            to="/network"
            className="flex flex-row gap-4  p-2 hover:cursor-pointer rounded-md"
            style={getActiveStyle}
          >
            <img src={Icon_my_network} alt="home" />
            <p>My Network</p>
          </NavLink>
          <NavLink
            to={`/bookmark`}
            className="flex flex-row gap-4  p-2 hover:cursor-pointer rounded-md"
            style={getActiveStyle}
          >
            <BookmarkIcon className="h-6 w-6" />
            <p>Bookmarks</p>
          </NavLink>

          <NavLink
            to={`/profile/${user._id}`}
            className="flex flex-row gap-4  p-2 hover:cursor-pointer rounded-md"
            style={getActiveStyle}
          >
            <img src={Icon_profile} alt="home" />
            <p>Profile</p>
          </NavLink>
        </ul>
      </aside>
      <main className="w-full mb-20 lg:mb-1   border-l border-r">
        <Routes>
          <Route path="scroll" element={<Scroll />} />
          <Route path="network" element={<Network />} />
          <Route path="bookmark" element={<Bookmark />} />
          <Route path="profile/:user_id" element={<Profile />} />
          <Route path="post/:post_id" element={<PostPage />} />
        </Routes>
      </main>
      <div className="bottom-navigation bg-bg-off-white fixed bottom-0 left-0 w-full">
        <ul className="flex flex-row gap-2 justify-evenly items-center py-2 ">
          <NavLink
            to="/scroll"
            className="flex flex-col  p-2 hover:cursor-pointer "
            style={getMobileActiveStyle}
          >
            <img src={Icon_home} alt="home" className="w-6 h-6 self-center" />
            <p className="text-xs text-gray-600">Scroll</p>
          </NavLink>
          <NavLink
            to="/network"
            className="flex flex-col  p-2 hover:cursor-pointer "
            style={getMobileActiveStyle}
          >
            <img
              src={Icon_my_network}
              alt="netowork"
              className="w-6 h-6 self-center"
            />
            <p className="text-xs text-gray-600">My Network</p>
          </NavLink>
          <NavLink
            to={`/bookmark`}
            className="flex flex-col  p-2 px-4 hover:cursor-pointer "
            style={getMobileActiveStyle}
          >
            <BookmarkIcon className="h-6 w-6 self-center" />
            <p className="">Bookmarks</p>
          </NavLink>
          <NavLink
            to={`/profile/${user._id}`}
            className="flex flex-col  p-2 px-4 hover:cursor-pointer "
            style={getMobileActiveStyle}
          >
            <img
              src={Icon_profile}
              alt="home"
              className="w-6 h-6 self-center"
            />
            <p className="text-xs text-gray-600">Profile</p>
          </NavLink>
        </ul>
      </div>
    </div>
  );
};

export { Feed };
