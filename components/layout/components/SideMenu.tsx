import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  SwipeableDrawer,
} from "@material-ui/core";
import { useRouter } from "next/router";

import {
  AssignmentInd,
  BarChart,
  BlurLinear,
  Contacts,
  Dehaze,
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

const prefix = process.env.NEXT_PUBLIC_BASE_PATH || "";

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
    float: "left",
    padding: "5px 16px",
  },
  navItem: {
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

type Anchor = "top" | "left" | "bottom" | "right";
const anchor: Anchor = "left";

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

const SideMenu = () => {
  const classes = useStyles();
  const router = useRouter();

  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };

  const renderItems = (anchor: Anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom",
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <React.Fragment>
        <div className="d-flex justify-content-center">
          <div style={{ width: "80%" }}>
            <Link href="/admin">
              <a>
                <Image
                  src={prefix + "/logo.png"}
                  alt="Logo"
                  width="2364"
                  height="710"
                  layout="responsive"
                />
              </a>
            </Link>
          </div>
        </div>

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
      </React.Fragment>
    </div>
  );

  return (
    <div>
      <React.Fragment key={anchor}>
        <Button
          className={clsx(classes.drawer, "d-block d-md-none")}
          onClick={toggleDrawer(anchor, true)}
        >
          <Dehaze />
        </Button>

        <SwipeableDrawer
          anchor={anchor}
          open={state[anchor]}
          onClose={toggleDrawer(anchor, false)}
          onOpen={toggleDrawer(anchor, true)}
        >
          {renderItems(anchor)}
        </SwipeableDrawer>
      </React.Fragment>
    </div>
  );
};

export default SideMenu;
