import React from "react";
import Link from "next/link";
import { List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import { useRouter } from "next/router";

import {
  AssignmentInd,
  BarChart,
  BlurLinear,
  Contacts,
  ExitToApp,
  Help,
  ListAlt,
  LibraryBooks,
  Lock,
  People,
  Store,
} from "@material-ui/icons";

import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";

import theme from "../../../theme";

const useStyles = makeStyles({
  list: {
    width: 300,
  },
  fullList: {
    width: "auto",
  },
  drawer: {
    backgroundColor: "#000",
    color: theme.palette.primary.main,
    padding: "5px 16px",
  },
  navItem: {
    color: "#333 !important",
    "&:hover, &.active": {
      color: "#fff",
      backgroundColor: theme.palette.primary.main,
      borderBottomRightRadius: 4,
      borderTopRightRadius: 4,
      "& .MuiListItemIcon-root": {
        color: "#fff",
      },
      "& .MuiListItemText-root": {
        color: "#fff",
      },
    },
  },
});

interface PageProps {
  icon: JSX.Element;
  title: string;
  route: string;
}

const pages: PageProps[] = [
  {
    icon: <Store />,
    title: "Thông tin cửa hàng",
    route: "/admin",
  },
  {
    icon: <Help />,
    title: "Hướng dẫn mua hàng",
    route: "/admin/policy",
  },
  {
    icon: <LibraryBooks />,
    title: "Danh mục nhóm sản phẩm",
    route: "/admin/categories",
  },
  {
    icon: <ListAlt />,
    title: "Danh mục sản phẩm",
    route: "/admin/products",
  },
  {
    icon: <BlurLinear />,
    title: "Thông tin đơn hàng",
    route: "/admin/invoices",
  },
  {
    icon: <BlurLinear />,
    title: "Phiếu nhập hàng",
    route: "/admin/imports",
  },
  {
    icon: <BlurLinear />,
    title: "Báo cáo tồn kho",
    route: "/admin/",
  },
  {
    icon: <BarChart />,
    title: "Báo cáo bán hàng",
    route: "/admin/dashboard",
  },
  {
    icon: <Contacts />,
    title: "Thông tin liên hệ",
    route: "/admin/contact",
  },
  {
    icon: <People />,
    title: "Danh mục khách hàng",
    route: "/admin/customers",
  },
  {
    icon: <AssignmentInd />,
    title: "Danh mục người dùng",
    route: "/admin/users",
  },
  {
    icon: <Lock />,
    title: "Đổi mật khẩu",
    route: "/admin/auth/change-password",
  },
  {
    icon: <ExitToApp />,
    title: "Thoát hệ thống",
    route: "/admin/auth/logout",
  },
];

const SideBar = () => {
  const classes = useStyles();
  const router = useRouter();

  return (
    <List>
      {pages.map((page: PageProps, index) => (
        <Link key={index} href={page.route} passHref>
          <ListItem
            button
            component="a"
            className={clsx(classes.navItem, {
              active: page.route === router.pathname,
            })}
          >
            <ListItemIcon>{page.icon}</ListItemIcon>
            <ListItemText primary={page.title} />
          </ListItem>
        </Link>
      ))}
    </List>
  );
};

export default SideBar;
