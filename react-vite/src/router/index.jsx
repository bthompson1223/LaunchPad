<<<<<<< HEAD
<<<<<<< HEAD
import { createBrowserRouter, Outlet } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import Layout from './Layout';
import Categories from '../components/Categories/categories';
import ProjectDetail from '../components/Projects/ProjectDetail/projectDetail';
import RewardList from '../components/Rewards/RewardList/rewardList';
import CreateProject from '../components/Projects/CreateProject/CreateProject';
import EditProject from '../components/Projects/EditProject/EditProject';
import OwnedProjects from '../components/Projects/OwnedProjects/OwnedProjects';
import CreateReward from '../components/Rewards/CreateReward/CreateReward';
=======
=======
>>>>>>> f7de57e8c4703a558382ef354adbd0f6c33c520d
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
<<<<<<< HEAD
>>>>>>> dev
=======
import CreateReward from '../components/Rewards/CreateReward/CreateReward';
>>>>>>> f7de57e8c4703a558382ef354adbd0f6c33c520d

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
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> f7de57e8c4703a558382ef354adbd0f6c33c520d
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
<<<<<<< HEAD
=======
        children: [
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
                element: <RewardList />,
              },
              {
                path: "edit",
                element: <EditProject />,
              },
            ],
          },
          {
            path: "new",
            element: <CreateProject />,
          },
          {
            path: "created-projects",
            element: <OwnedProjects />,
          },
        ],
      },
>>>>>>> dev
=======
>>>>>>> f7de57e8c4703a558382ef354adbd0f6c33c520d
    ],
  },
]);
