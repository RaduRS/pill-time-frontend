import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import EveryDay from "./EveryDay";
import axios from "axios";
import Button from "react-bootstrap/Button";
import logo from "../assets/logo.jpg";

import { useEffect, useState } from "react";

const URL = process.env.REACT_APP_SERVER_URL;

const Reminder = () => {
  const [formData, setFormData] = useState({
    name: "",
    completed: false,
  });
  const [reminders, setReminders] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { name } = formData;

  const handleInputChange = (e) => {
    const [name, value] = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const getReminders = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get(`${URL}/api`);
      setReminders(data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getReminders();
  }, []);

  const setToComplete = async (reminder) => {
    const newFormData = { name: reminder.name, completed: true };
    try {
      await axios.put(`${URL}/api/${reminder._id}`, newFormData);
      getReminders();
    } catch (error) {
      console.log(error);
    }
  };

  const setToIncomplete = async (reminder) => {
    const newFormData = { name: reminder.name, completed: false };
    try {
      await axios.put(`${URL}/api/${reminder._id}`, newFormData);
      getReminders();
    } catch (error) {
      console.log(error);
    }
  };

  const resetButton = async (reminder) => {
    try {
      reminders.map(async (value) => {
        const newFormData = { name: value.name, completed: false };
        await axios.put(`${URL}/api/${value._id}`, newFormData);
        getReminders();
      });
    } catch (error) {
      console.log(error);
    }
  };

  const groupNames = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const reminderNames = ["AM", "PM", "AM", "PM", "AM", "PM", "AM"];

  return (
    <Container>
      <img src={logo} alt="" />
      <h1 className="title">Have you taken your medicine yet?</h1>
      {isLoading && (
        <div className="wrapper">
          <div class="circle"></div>
          <div class="circle"></div>
          <div class="circle"></div>
          <div class="shadow"></div>
          <div class="shadow"></div>
          <div class="shadow"></div>
        </div>
      )}
      {!isLoading && (
        <div>
          <Row>
            {reminders
              .reduce((acc, reminder, index) => {
                if (index % 2 === 0) {
                  acc.push([reminder]);
                } else {
                  acc[acc.length - 1].push(reminder);
                }
                return acc;
              }, [])
              .map((group, index) => (
                <Row className="group" col={6} key={index}>
                  <h2>{groupNames[index]}</h2>
                  {group.map((reminder, i) => (
                    <EveryDay
                      name={reminderNames[i]}
                      reminder={reminder}
                      id={reminders._id}
                      key={reminder._id}
                      className={reminderNames[i] === "AM" ? "am-only" : ""}
                      setToComplete={setToComplete}
                      setToIncomplete={setToIncomplete}
                    />
                  ))}
                </Row>
              ))}
          </Row>
          <Container className="button">
            <button className="button-74" onClick={resetButton}>
              Reset ALL
            </button>
          </Container>
        </div>
      )}
    </Container>
  );
};

export default Reminder;
