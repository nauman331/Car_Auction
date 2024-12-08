import React from "react";
import "../../assets/stylesheets/admin/dashboard.scss";
import { Car, Search, MessagesSquare, Bookmark, MoveUpRight } from "lucide-react";
import ChartGraph from "./ChartGraph";


const Dashboard = () => {

  return (
    <>
      <h4>Dashboard</h4>
      <small>Lorem ipsum dolor sit amet, consectetur.</small>

      <div className="info-boxes">
        {[{ title: "Listings", count: "65,984", Icon: Car, iconClass: "icon1" }, { title: "Searches", count: "19", Icon: Search, iconClass: "icon2" }, { title: "Messages", count: "15", Icon: MessagesSquare, iconClass: "icon3" }, { title: "Bookmarks", count: "22,786", Icon: Bookmark, iconClass: "icon4" }].map(({ title, count, Icon, iconClass }, idx) => (
          <div key={idx} className="info-box">
            <span>
              <small>{title}</small>
              <h4>{count}</h4>
            </span>
            <span className={iconClass}>
              <Icon />
            </span>
          </div>
        ))}
      </div>

      <div className="chart-and-notification">
       <ChartGraph />
        <div className="notifications">
          <h6>Bidding Notifications</h6>
          <span className="notification">
          <div className="icon3">
          <MessagesSquare />
          </div>
          <small>New notification Check Messages</small>
          </span>
          <span className="notification">
          <div className="icon3">
          <MessagesSquare />
          </div>
          <small>New notification Check Messages</small>
          </span>
          <span className="notification">
          <div className="icon3">
          <MessagesSquare />
          </div>
          <small>New notification Check Messages</small>
          </span>
          <span className="notification">
          <div className="icon3">
          <MessagesSquare />
          </div>
          <small>New notification Check Messages</small>
          </span>
          <span className="notification">
          <div className="icon3">

          <MessagesSquare />
          </div>
          <small>New notification Check Messages</small>
          </span>
          <span className="notification">
          <div className="icon3">
          <MessagesSquare />
          </div>
          <small>New notification Check Messages</small>
          </span>
          <span className="notification">
          <div className="icon3">
          <MessagesSquare />
          </div>
          <small>New notification Check Messages</small>
          </span>
       <button>View More <MoveUpRight /></button>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
