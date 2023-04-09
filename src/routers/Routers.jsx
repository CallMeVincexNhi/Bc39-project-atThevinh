import React from "react";
import { useRoutes } from "react-router-dom";
import MainLayout from "../layouts/mainlayout/MainLayout";
import Admin from "../pages/admin/Admin";
import AddNewComment from "../pages/admin/servicePage/comments/AddNewComment";
import Comments from "../pages/admin/servicePage/comments/Comments";
import AddNewHire from "../pages/admin/servicePage/hireWork/AddNewHire";
import HireWork from "../pages/admin/servicePage/hireWork/HireWork";
import AddAdmin from "../pages/admin/user/AddAdmin";
import User from "../pages/admin/user/User";
import AddWork from "../pages/admin/work/AddWork";
import Work from "../pages/admin/work/Work";
import AddDetailWorkType from "../pages/admin/worktype/detailWorkType/addDetailWorkType/AddDetailWorkType";
import DetailWorkType from "../pages/admin/worktype/detailWorkType/DetailWorkType";
import AddWorkType from "../pages/admin/worktype/workType/AddWorkType";
import WorkType from "../pages/admin/worktype/workType/WorkType";
import EditProfile from "../pages/editProfile/EditProfile";
import Home from "../pages/main/Home";

import WorkCategory from "../pages/main/WorkCategory";
import WorkDetail from "../pages/main/WorkDetail";
import WorkList from "../pages/main/WorkList";
import NotFound from "../pages/notFound/NotFound";
import Profile from "../pages/profile/Profile";
import SignIn from "../pages/signin/SignIn";
import SignUp from "../pages/signup/SignUp";

const Routers = () => {
  const routing = useRoutes([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        { path: "/", element: <Home /> },
        {
          path: "home",
          element: <Home />,
        },
        {
          path: "worklist",
          element: <WorkList />,
        },
        {
          path: "worklist/:idcv",
          element: <WorkList />,
        },
        {
          path: "workcategory/:id",
          element: <WorkCategory />,
        },
        {
          path: "workcategory",
          element: <WorkList />,
        },
        {
          path: "workdetail/:idloaiCV/:idwork",
          element: <WorkDetail />,
        },
        {
          path: "/profile/:id",
          element: <Profile />,
        },
        {
          path: "/profile/:id/editprofile",
          element: <EditProfile />,
        },
      ],
    },
    {
      path: "/signin",
      element: <SignIn />,
    },
    {
      path: "/signup",
      element: <SignUp />,
    },
    {
      path: "/admin",
      element: <Admin />,
      children: [
        {
          path: "/admin",
          element: <User />,
        },
        {
          path: "/admin/user",
          element: <User />,
        },
        {
          path: "/admin/work",
          element: <Work />,
        },
        {
          path: "/admin/worktype",
          element: <WorkType />,
        },
        {
          path: "/admin/worktype/addworktype",
          element: <AddWorkType />,
        },
        {
          path: "/admin/worktype/detailworktype",
          element: <DetailWorkType />,
        },
        {
          path: "/admin/worktype/detailworktype/adddetailworktype",
          element: <AddDetailWorkType />,
        },
        {
          path: "/admin/services",
          element: <HireWork />,
        },
        {
          path: "/admin/services/hirework",
          element: <HireWork />,
        },
        {
          path: "/admin/services/hirework/addnewhire",
          element: <AddNewHire />,
        },
        {
          path: "/admin/services/comments",
          element: <Comments />,
        },
        {
          path: "/admin/services/comments/addnewcomments",
          element: <AddNewComment />,
        },
        {
          path: "/admin/user/addadmin",
          element: <AddAdmin />,
        },
        {
          path: "/admin/user/addwork",
          element: <AddWork />,
        },
      ],
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);
  return routing;
};

export default Routers;
