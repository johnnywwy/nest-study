import { Outlet, useNavigate } from "react-router-dom";
import { Menu as AntdMenu, MenuProps } from "antd";
import "./modifyMenu.css";

const items: MenuProps["items"] = [
  {
    key: "1",
    label: "信息修改",
  },
  {
    key: "2",
    label: "密码修改",
  },
];

export function ModifyMenu() {
  const navigate = useNavigate();

  const handleMenuItemClick: MenuClickEventHandler = (info) => {
    console.log("点击了吗哈哈哈", info);

    if (info.key === "1") {
      navigate("/user/info_modify");
    } else {
      navigate("/user/password_modify");
    }
  };

  return (
    <div id="menu-container">
      <div className="menu-area">
        <AntdMenu
          defaultSelectedKeys={
            location.pathname === "/user/info_modify" ? ["1"] : ["2"]
          }
          items={items}
          onClick={handleMenuItemClick}
        />
      </div>
      <div className="content-area">
        <Outlet></Outlet>
      </div>
    </div>
  );
}
