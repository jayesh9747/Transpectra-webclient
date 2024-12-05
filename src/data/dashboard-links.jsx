import { ACCOUNT_TYPE } from "../utils/constants"

export const sidebarLinks = [
  {
    id: 1,
    name: "My Profile",
    path: "/dashboard/my-profile",
    type: ACCOUNT_TYPE.WAREHOUSE_MANAGER,
    icon: "VscAccount",
  },
  {
    id: 1,
    name: "My Profile",
    path: "/dashboard/my-profile",
    type: ACCOUNT_TYPE.SUPPLIER,
    icon: "VscAccount",
  },
  {
    id: 2,
    name: "Yard Profile",
    path: "/dashboard/my-profile-yard",
    type: ACCOUNT_TYPE.YARD_MANAGER,
    icon: "VscAccount",
  },
  {
    id: 4,
    name: "Dashboard",
    path: "/dashboard/analytics",
    type: ACCOUNT_TYPE.WAREHOUSE_MANAGER,
    icon: "VscDashboard",
  },
  {
    id: 5,
    name: "Fleet Activity",
    path: "/dashboard/fleetActivity",
    type: ACCOUNT_TYPE.WAREHOUSE_MANAGER,
    icon: "VscCalendar",
  },
  {
    id: 6,
    name: "Inventory",
    path: "/dashboard/inventory",
    type: ACCOUNT_TYPE.WAREHOUSE_MANAGER,
    icon: "VscPreview",
  },
  {
    id: 7,
    name: "Orders",
    path: "/dashboard/orders",
    type: ACCOUNT_TYPE.WAREHOUSE_MANAGER,
    icon: "VscGraph",
  },
  {
    id: 8,
    name: "Requests",
    path: "/dashboard/deliveries",
    type: ACCOUNT_TYPE.SUPPLIER,
    icon: "VscChecklist",
  },
  {
    id: 9,
    name: "Incoming Fleet",
    path: "/dashboard/incomingtruck",
    type: ACCOUNT_TYPE.YARD_MANAGER,
    icon: "VscCalendar",
  },
  {
    id: 10,
    name: "Outgoing Fleet",
    path: "/dashboard/exitingtruck",
    type: ACCOUNT_TYPE.YARD_MANAGER,
    icon: "VscGraph",
  },
  {
    id: 11,
    name: "Deliveries",
    path: "/dashboard/order-deliveries",
    type: ACCOUNT_TYPE.SUPPLIER,
    icon: "VscGraph",
  },
]