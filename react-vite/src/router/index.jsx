import { createBrowserRouter, Outlet } from "react-router-dom";
import LoginFormPage from "../components/LoginFormPage";
import SignupFormPage from "../components/SignupFormPage";
import Layout from "./Layout";
import Categories from "../components/Categories/categories";
import ProjectDetail from "../components/Projects/ProjectDetail/projectDetail";
import RewardList from "../components/Rewards/RewardList/rewardList";
import CreateProject from "../components/Projects/CreateProject/CreateProject";
import EditProject from "../components/Projects/EditProject/EditProject";
import OwnedProjects from "../components/Projects/OwnedProjects/OwnedProjects";
import SplashPage from "../components/SplashPage/splashPage";
import CreateReward from '../components/Rewards/CreateReward/CreateReward';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <SplashPage />,
      },
      {
        path: "login",
        element: <LoginFormPage />,
      },
      {
        path: "signup",
        element: <SignupFormPage />,
      },
      {
        path: "categories",
        element: <Outlet />,
        children: [
          {
            path: ":category",
            element: <Categories />,
          },
        ],
      },
      {
        path: "projects",
        element: <Outlet />,
        children:[
            {
                path: ":projectId",
                element: <Outlet />,
                children: [
                  {
                    index: true,
                    element: <ProjectDetail />,
                  },
                  {
                    path: "rewards",
                    element: <Outlet />,
                    children: [
                      {
                        index: true,
                        element: <RewardList />
                      }, 
                      {
                        path: 'new',
                        element: <CreateReward />
                      }, 
                    ]
                    
                  },
                  {
                    path: "edit",
                    element: <EditProject />
                  }
                ]
            },
            {
              path: "new",
              element: <CreateProject />
            },
            {
              path: "created-projects",
              element: <OwnedProjects />
            }
        ]
      }
    ],
  },
]);
